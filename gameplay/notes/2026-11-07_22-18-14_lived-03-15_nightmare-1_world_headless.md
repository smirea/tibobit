# 2026-11-07 22-18-14: lived 03:15 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=fe1xq9yhwckxn&stats=A99bAO8FC5wBAHoRAQAAzwkFAB_xAb9IAMvnAa4lAAPWA9gUAHniAtwTAg0C_dAD0xABCHpF4_ectihPCduPp4w6AxYBEtABHgoCAAEAAAADAAAApAEAAAIKAQMIBARyxgLiBQMJCAcVISYKMSUABAgF6wLDAWRcAQUVBQFxtzsAAr0oAfhHEwA6NRAAYAgNBgEABwIAAAkHA66WAdABAAoClwwRAQMSAgPWFgEBIBIAENEufxrEIS_GDIL398kqNQA |
| Ending | died at 3:15, level 11, 751 kills |
| Opening | first chest listed 3:04; 0 chests opened by 2:30; 1 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | nothing named |
| Seed | 1J9Q1BI |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 282f812 docs(gameplay): cursor reviews the 2026-11-07 22:11 run, lived 4:46, testing E135 |
| Coach prompts | none (exploit run); coach-retrospective.md 29ea3ff1 |
| Templates from | 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (exploit run) |
| Log | /tmp/tibobit/2026-11-07_22-18-14_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:15** (195.7s), level 11, 751 kills.
- Damage taken by source: boss:amusing 58.8, enemy:sand-crab 40.4, boss:beetle-queen 19, enemy:wireworm-larva 15.6, enemy:crumb-ant 13.2, enemy:oil-drip 12.3, enemy:garden-slug 9.1, Hot oil 8, enemy:ketchup-drop 7, enemy:fry-fly 6.6, enemy:beetle-brood 4.6, enemy:bog-slime 4.6, enemy:sprout-mite 3.9, enemy:tomato-leech 3.1, enemy:aphid 2; 208 in all. Health gained over the run, by food, regeneration and anything else: about 76 (the game does not say from what).
- Weapons: Tater Tot Pup 3/8, Hash Brown Shield 1/8, Whisk Vortex 1/8, Fry Lance 2/8.
- Passives: Gravy Heart 3/5, Stuffed Skin 1/5.
- Items: none.
- Planner asked 73 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 142/149 | 6 | 28 | 4 | 29 | enemy:crumb-ant, Hot oil |
| 1:00 | 135/149 | 7 | 0 | 6 | 70 | enemy:tomato-leech, enemy:bog-slime |
| 2:00 | 77/163 | 74 | 14 | 8 | 114 | boss:amusing, enemy:oil-drip |
| 3:00 | 3/176 | 109 | 34 | 11 | 158 | enemy:sand-crab, boss:beetle-queen |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: 3:04. First time under 25% health: 3:06.
- Goals by kind (done / gave up / dropped): explore 24/0/10; spot 2/0/1; elite 1/0/1; chest 0/0/1.
- Dashes: 10 (1:29, 1:37, 1:43, 2:02, 2:20, 2:44, 2:53, 3:00, 3:05, 3:11).
- Model calls: 63 plans, 10 picks, 98 moves (mean 189ms); the page walked through 12 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:30 Hash Brown Shield 1/8 new; 0:50 Gravy Heart 1/5 new; 1:24 Whisk Vortex 1/8 new; 1:44 Fry Lance 1/8 new; 3:14 Stuffed Skin 1/5 new.

## Plan

Exploit run (one run in 3 of this coach): the champion templates from 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (Nightmare 1, lived 17:41), unchanged, starting with tater-pup. It tests nothing new: it is a real attempt at 20:00 and a second sample of the best play so far, so the review can tell how much of that run was luck.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

Exploit replay of the 17:41 champion stack (state chest directive, generic `planner.goal`, E24 dash, `tater-pup`, seed 1J9Q1BI). No named experiment. Tibo lived **3:15**, died level 11 with **0 evolutions** and **0 chests opened**; the first chest appeared at **3:04** only after killing the sand crab on an elite goal (`E65566`), then `Open the chest` scored **83%** but the channel ended at **3 hp** under Colorado Queen and crowd. That pattern matches **chest-starved / late-list** seeds (R7YOVY, 1GSODM7, 104SEQ7), not the TZ4L67 / 20-34-44 opener. The hypothesis “17:41 was mostly luck” is **not** tested on this seed: exploit variance tracks **first chest time and opens by ~2:00**, not template identity alone (B103).

## Findings

- **Late-list exploit death (lead):** First chest listed **3:04** (stats); **0** opens by **2:30** and through death. Elite kill at **3:04** dropped chest (`C65905`); planner chose open at **83%** (log **3:04:184.7**). Compare champion **20-34-44:** first list **1:18**, lived **17:41** (B103, B124).
- **Minute 2 is the cliff (likely):** Health **135→77** minute 1→2 (stats); `boss:amusing` **58.8** of **208** total outcome. Boss first seen **2:00**; goals stayed **explore** until **2:16** Beetle Nest (spot **2/0/1** goals).
- **Open scored but survival failed (lead):** At **3:04** health **45/163**; open goal started; by **3:06** **29 hp**, **3:14** picks on chest; **3:15** death **3/176** with `enemy:sand-crab` **40.4**, `boss:beetle-queen` **19**, brood/wireworm swarm (run_end row). Generic goal **did** prefer open when chest listed—unlike NJRNZQ drop at high hp (B123).
- **Build weak without chest (confirmed on this seed):** Death board Tater Tot Pup **3/8**, Fry Lance **2/8**, no Gravy Pack; **10** level-up picks, spread weapons/passives (B72, B49).
- **Elite fight aborted (lead):** `Fight the Sand Crab` started **2:18** after Beetle Nest; dropped **2:19** for explore; later elite **3:00** `E65566` coincided with queen appearance **3:00**—sand crab kill at **3:04** was costly (health **75→45** in that window).

## Went well

- **2:16–2:18** Beetle Nest charge completed (`P85`, done **2:18:138.7**)—spot goal broke explore loop briefly.
- Early picks aligned with champion habit: Hash Brown Shield **0:29**, Gravy Heart **0:50** / **0:57**, Whisk **1:24**, Fry Lance **1:44**, Gravy **2:43**.
- **3:04** planner ranked **Open the chest (5 down-left) 83%** over fight/chest charge options—state chest priority visible once a chest existed.

## Went poorly

- **0:00–3:04** **24** explore goals done, **10** dropped—no chest in options until elite drop (**first chest listed 3:04**); wasted amusing cheap window (B26 clock held: amusing **2:00**, queen **3:00**).
- **2:19–2:21** **~40 hp** lost to `boss:amusing` while on explore up (`hp` **129→90** at **2:19–2:21**); no evade/chest directive usable without listing.
- **3:00–3:04** fought sand crab with queen + amusing present; minute 3 **109 hp lost** (stats), ended **3/176** before evolution path existed (B72).
- **12** forecast-free walk hits (stats)—crowd/boss damage on page walks with `distrustBossRange 0` (B17).

## Moments

- **0:00** explore up-right wins; no chest column for entire opening—**right call** given rules, costly on this seed.
- **0:33** hot oil walk **2 hp** (`walk` row **0:33**)—early hazard tax.
- **1:29** dash left on explore **69%**—ok dodge.
- **2:00** amusing appears; plan still **explore down-left**—**better:** evade or gems if no chest; no chest to open.
- **2:16** explore right done → **Beetle Nest 53%** goal—**right call**.
- **2:18** Beetle Nest done → elite fight **36%**—**right call**; dropped next second for explore after level-up—**better:** keep elite to **3:04**-class drop earlier if policy allows.
- **2:19** level-up Fry Lance; **2:20** dash away from amusing after **20+38 hp** boss ticks—late but necessary.
- **2:43** Gravy Heart on Crop Patch charge—**right call** for sustain.
- **3:00** queen + fight sand crab goal; health **75**—**better:** evade until chest or food; elite under dual boss.
- **3:04** sand crab killed, chest listed, **Open 83%**—**right call**; health **45**.
- **3:06** under **25%** on chest (`3:06` row **45→29**); still on open—**better:** food if listed (none in log).
- **3:15** death on open channel—**forecast/page walks** into `sand-crab`/`wireworm`/`beetle-queen`—campaign wall on this seed without earlier chest.

## Questions

- Does seed **1J9Q1BI** never list a explore-found chest before **3:00**, only elite/boss drops (like **3:04**)?
- On late-list exploits, does **E81 `planner.goal` chest yes** improve **opens before queen** when the first list is **2:45–3:10** (this run: open won but hp too low)?
- Would **eliteSeconds** completion + **E60** after **2:00** list a chest **~1:30–2:00** on this seed class?

## Next

1. **E132 / meta batch:** Tag **1J9Q1BI** with `first_chest_listed=3:04`, `opens_by_2:30=0`; next exploit on **TZ4L67-class** seed only when comparing to **17:41**—not another late-list draw alone.
2. **E124:** Champion exploit **+ E81 goal lines** on a seed with list **<1:45** (replicate **13:08** path); this run shows state-only + generic goal can score open once but not survive minute 3 without earlier power.
3. **E111 or E137:** On chest-starved seeds, test **fight-elite / explore-no after 2:00** to force an earlier drop—this run's only chest came from **3:04** elite kill, too late for evolution.

## Beliefs changed

- **B103:** evidence += `2026-11-07_22-18-14` exploit **3:15**, first chest **3:04**, **0** opens; stratify before luck tests (confidence **likely**, status **held**).
- **B49:** evidence += seed **1J9Q1BI**: no chest in log until **3:04** elite drop (confidence **likely**, status **held**).
- **B124:** evidence += late-list seed can still score **Open 83%** once chest exists but die sub-**4:00** without opens (recheck distance vs **13:08** NJRNZQ/TZ4L67 split) (confidence **lead** → **likely**, status **recheck**).

## Process changes

(none)

<!-- /review -->

## Picks

- **0:29** level-up: took Hash Brown Shield from Hash Brown Shield, Sprout Squad, Mash Wave.
- **0:30** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.
- **0:50** level-up: took Gravy Heart from Gem Sling, Gravy Heart, Seed Potato.
- **0:50** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **0:57** level-up: took Gravy Heart from Gravy Heart, Hash Brown Shield, Root Network.
- **0:57** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:24** level-up: took Whisk Vortex from Packed Pan, Whisk Vortex, Salt Shaker.
- **1:24** gained without a pick (a chest or other): Whisk Vortex 1/8 new.
- **1:44** level-up: took Fry Lance from Hot Start, Hash Brown Shield, Fry Lance.
- **1:44** gained without a pick (a chest or other): Fry Lance 1/8 new.
- **2:19** level-up: took Fry Lance from Clean Plate, Butter Socks, Fry Lance.
- **2:19** gained without a pick (a chest or other): Fry Lance 1/8 to 2/8.
- **2:43** level-up: took Gravy Heart from Gravy Heart, Golden Fry, Fry Lance.
- **2:43** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.
- **3:12** level-up: took Tater Tot Pup from Tater Tot Pup, Root Spikes, Thick Skin.
- **3:12** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **3:14** level-up: took Stuffed Skin from Butter Pat, Stuffed Skin, Chives.
- **3:14** gained without a pick (a chest or other): Stuffed Skin 1/5 new.
- **3:14** level-up: took Tater Tot Pup from Tater Tot Pup, Thick Skin, Whisk Vortex.
- **3:14** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
2. If health is under 70% and food is listed, eat the food.
3. Evade only when no chest and no food is listed.
4. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Evading all the time did not work: the last run never opened a chest and died at 3:16.
- Weapons stay weak without chests. Open chests early to get stronger.
- A step that looks free can still cost 4 to 9 hp when many enemies are close.
- A base weapon at max level plus its catalyst evolves at the next chest.
- Food heals about 30 hp. Eat it before health is very low.
- Hot oil and bosses also hurt. Do not stand in hot oil.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest?
~~~

### action.state

~~~text
Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.
Goal: {{goal}}.
{{health}}
{{hurt_by}}
{{enemies}}
{{dash}}
~~~

### action.hurt

~~~text
If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second?
~~~

### action.useful

~~~text
If Tibo does this: {{move}}. Does it bring Tibo closer to its goal ({{goal}})?
~~~

### action.dash

~~~text
{{health}}
{{hurt_by}}
{{enemies}}
Should Tibo dash now because health fell 5 or more in the last 3 seconds, or because 5 or more enemies are within 60 units?
~~~

### knobs

~~~json
{
  "exploreDistance": 300,
  "evadeSeconds": 8,
  "gemsSeconds": 12,
  "stuckSeconds": 6,
  "extraDamage": 0.02,
  "safeMargin": 0.1,
  "distrustSeconds": 0,
  "distrustBossRange": 0,
  "planEvery": 5,
  "eliteSeconds": 20,
  "lockstep": 0,
  "bossOfferRange": 0
}
~~~
