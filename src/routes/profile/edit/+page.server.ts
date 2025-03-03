import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { user, type User } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { validatePassword, validateUsername } from "$lib/server/validation";
import { verify } from "@node-rs/argon2";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user === null) {
    return redirect(301, "/login");
  }
  return { user: event.locals.user };
};

// Handle form submission
export const actions: Actions = {
  default: async ({ request, locals }) => {
    const currentUser = locals.user!;
    const profileId = locals.user?.id;

    if (!profileId) {
      throw redirect(302, "/login");
    }

    const results = await db.select().from(user).where(eq(user.username, currentUser.username));
    const fullUser = results.at(0);
    if (!fullUser) {
      return { success: false, message: "user not found" };
    }

    const newUser: Partial<User> = {
      username: currentUser.username,
      passwordHash: fullUser.passwordHash,
    };

    const formData = await request.formData();
    const newUsername = formData.get("username")?.toString().trim();
    const oldPassword = formData.get("password")?.toString();
    const newPassword = formData.get("newpassword")?.toString();
    const newPassword2nd = formData.get("newpassword2nd")?.toString();

    if (newUsername && !validateUsername(newUsername)) {
      return { success: false, message: "This username does not meet the requirements" };
    } else if (newUsername) {
      newUser.username = newUsername;
    }

    if (oldPassword && newPassword && newPassword2nd) {
      const validPassword = await verify(fullUser.passwordHash, oldPassword, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      if (!validPassword) {
        return { success: false, message: "Incorrect username or password" };
      }

      if (newPassword !== newPassword2nd) {
        return { success: false, message: "The two passwords do not match" };
      }
    }

    // update db
    await db.update(user).set(newUser).where(eq(user.id, profileId));

    console.log("udpated user");

    return { success: true };
  },
};
