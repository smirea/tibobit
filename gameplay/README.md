# Gameplay

What the bot (`scripts/tibo-bot.ts`) learns from its runs.

- `strategy.md` is the generic strategy. Every run loads it: the coach reads it in full, and its advice reaches the decision model as one line of context. After each run the coach rewrites it from the run's notes and stats.
- `notes/` holds one dated file per run, made from `notes/TEMPLATE.md`. The run's share link goes at the top once the game shows the run summary, then the coach's notes by game time, the outcome, and the post-run review.
- `infrastructure_feedback.csv` collects the coach's suggestions about the bot itself: data the decision model lacks, missing commands, confusing descriptions. Columns: `date,run,time,notes`, where `time` is the game time the suggestion came from.
