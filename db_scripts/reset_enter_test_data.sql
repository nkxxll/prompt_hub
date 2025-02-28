DELETE FROM user;
-- Reset auto-increment values
DELETE FROM sqlite_sequence WHERE name='user';

-- Insert users
INSERT INTO user (id, username, password_hash) VALUES
('1', 'user1', 'password'),
('2', 'user2', 'password'),
('3', 'user3', 'password');

-- Clear prompt_patterns table
DELETE FROM prompt_patterns;

-- Reset auto-increment values
DELETE FROM sqlite_sequence WHERE name='prompt_patterns';

-- Insert prompt patterns
INSERT INTO prompt_patterns (id, name, format_string, llm_website, notes, category, usage_count, public, user_id, created_at, updated_at) VALUES
(1, 'Greeting Prompt', 'Hello, $<name>$!', 'https://chat.openai.com', 'Simple greeting message', 'Greeting', 10, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Farewell Prompt', 'Goodbye, $<name>$! See you on $<day>$!', 'https://chat.openai.com', 'Friendly farewell', 'Farewell', 5, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Order Confirmation', 'Your order for $<item>$ has been placed.', 'https://chat.openai.com', 'Confirms an order', 'E-commerce', 7, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Appointment Reminder', 'Reminder: Your appointment is on $<date>$ at $<time>$.', 'https://chat.openai.com', 'Reminder message', 'Notifications', 12, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Weather Update', 'The weather in $<city>$ is currently $<weather>$°C.', 'https://chat.openai.com', 'Sends weather info', 'Weather', 8, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Support Ticket Response', 'Your ticket #$<ticket_id>$ is being processed.', 'https://chat.openai.com', 'Automated support response', 'Support', 3, 0, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Motivational Message', 'Keep going, $<name>$! Youre doing great!', 'https://chat.openai.com', 'Daily motivation', 'Motivation', 15, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Newsletter Subscription', 'Thanks for subscribing, $<email>$!', 'https://chat.openai.com', 'Subscription confirmation', 'Newsletter', 6, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Travel Itinerary', 'Your flight to $<destination>$ is at $<time>$.', 'https://chat.openai.com', 'Flight details', 'Travel', 4, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Job Interview Reminder', 'Your interview with $<company>$ is on $<date>$ at $<time>$.', 'https://chat.openai.com', 'Job interview reminder', 'Jobs', 2, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
