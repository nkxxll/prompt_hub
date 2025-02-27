# Build stage
FROM oven/bun:latest AS runner
WORKDIR /app

COPY . .

# Ensure database directory exists
VOLUME ["/app/data"]

RUN bun install --frozen-lockfile

RUN bun run build

# Expose the port
EXPOSE 4173

# Start the SvelteKit server
CMD ["bun", "run", "preview", "--host"]
