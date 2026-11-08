# 2026-11-07 21-17-44: lived 03:59 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=6929cppasgfpt&stats=A7hwALYBByIAzyEAAADDCwMAA9YBsBoAGWIChAkC9QEB_dAECnpFnLYJ24-n4_flIe4JKE-MOgMWARKCAkcMAAABAAAABQEAALkBAAACCAEDCAQAflpoAwsKJBclChIODgRGDgQEA3MzEAUVBQFxt0QAzyE3AW_1JABYHRAAo4AOBgEABwIAAAkGA6klggIACgLqDBEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMgvf3ySo1AA |
| Ending | died at 3:59, level 7, 182 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 6 at 3:00 |
| Testing | nothing named |
| Seed | 10T7HER |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 606e925 docs(gameplay): cursor reviews the 2026-11-07 21:12 run, lived 3:17, testing E105 |
| Coach prompts | none (exploit run); coach-retrospective.md 29ea3ff1 |
| Templates from | 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (exploit run) |
| Log | /tmp/tibobit/2026-11-07_21-17-44_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:59** (239.9s), level 7, 182 kills.
- Damage taken by source: boss:amusing 67.6, enemy:field-crow 54.9, boss:late-blight 36.5, enemy:harvest-mouse 16.4, enemy:tomato-leech 14.1, boss:beetle-queen 13.6, Hot oil 13.3, enemy:cave-grub 7.1, enemy:bog-slime 7, Brambles 5.6, enemy:aphid 4.3, enemy:sand-crab 4.2, enemy:frost-flea 3.6, enemy:sprout-mite 2.9, enemy:ketchup-drop 2.6, enemy:potato-beetle 2.3, enemy:little-grey 1.9; 258 in all. Health gained over the run, by food, regeneration and anything else: about 123 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Skipping Cannonball 2/8.
- Passives: Gravy Heart 4/5.
- Items: none.
- Planner asked 82 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 139/149 | 10 | 28 | 4 | 28 | Brambles, enemy:potato-beetle |
| 1:00 | 140/178 | 25 | 26 | 6 | 70 | enemy:tomato-leech, Hot oil |
| 2:00 | 98/178 | 77 | 36 | 6 | 116 | boss:amusing, enemy:field-crow |
| 3:00 | 2/178 | 130 | 33 | 7 | 173 | boss:late-blight, enemy:field-crow |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; Late Blight (late-blight) at 3:41.
- First chest listed: never. First time under 25% health: 3:55.
- Goals by kind (done / gave up / dropped): explore 31/0/10; spot 6/0/1.
- Dashes: 12 (0:37, 1:32, 1:45, 2:07, 2:13, 2:50, 2:55, 3:05, 3:12, 3:43, 3:51, 3:57).
- Model calls: 76 plans, 6 picks, 89 moves (mean 183ms); the page walked through 34 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:12 Gravy Heart 1/5 new; 0:27 Skipping Cannonball 1/8 new.

## Plan

Exploit run (one run in 3 of this coach): the champion templates from 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (Nightmare 1, lived 17:41), unchanged, starting with tater-pup. It tests nothing new: it is a real attempt at 20:00 and a second sample of the best play so far, so the review can tell how much of that run was luck.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

Exploit run with unchanged champion templates from 2026-11-07_20-34-44 (17:41). It tested whether a second sample could reach ~20:00; it did not test a planner or knob hypothesis. Tibo lived **3:59** on seed **10T7HER**: **first chest listed never**, **0 opens**, **0 evolutions**, weapons **Tater Tot Pup 1/8** and **Skipping Cannonball 2/8**, **Gravy Heart 4/5**. Minute 2 lost **77** (amusing + field-crow); minute 3 lost **130** (late-blight + field-crow). Outcome damage **258**, top sources **boss:amusing 67.6**, **enemy:field-crow 54.9**, **boss:late-blight 36.5**. Compared with the champion on another seed (chest **1:18**, lived **17:41**), this is **seed/opener failure**, not evidence that the stack itself broke. It **supports** treating exploit variance as opener-dependent (chest listing) and **does not refute** B35’s top-band repeatability on chest-friendly seeds.

## Findings

- **Chest-never seed on exploit stack**: Stats and log show **first chest listed never** through death; **31 explore done**, **0 chest goals**. Same failure mode as **1HHPOWV**, **1BGLAXR** (list late or never), unlike **15QD6RY** / **SBBOHY**. **Likely** (one seed, matches B49 pattern).
- **No evolution path without a chest**: Gravy Heart to **4/5** and pup still **1/8**; directive says open listed chests but none listed. **Confirmed** for this run (trivial given zero chests).
- **Amusing minute without chest or evade pivot**: **2:00** amusing plan still scores **explore down-right 52%**; health **140→98** over minute 2, **boss:amusing 67.6** total. **Keep-away ~18–23%** on sampled plans; **0 evade goals** (B58). **Likely** on chest-starved + generic goal question.
- **Field-crow swarm dominates once bosses are up**: **54.9** outcome damage; minute 3 ends **2/178** with **enemy:field-crow 22** and **33** in last windows at **3:55–3:57**. **Lead** (one seed; aligns with B15 pests matter on world).
- **Beetle Nest spots complete but do not replace chest loop**: **6 spot goals done** (e.g. **0:58** P62, **1:42** P109, **2:06** P119, **2:37** P171, **3:38** P203 dropped when Late Blight appeared, **3:50** P216); **0 elite-fight goals**, **0 chest opens**. Nests charge; no logged elite-kill chest drop in outcome. **Likely** nests alone do not fix chest-never seeds on this template set.
- **Exploit luck hypothesis (E103)**: Second short exploit after **1:53** on **1EXPRJG**; this run **3:59** with opener worse than champion. **Inconclusive** for “half of exploits within 3 min of champion” — **0/2** long, **2/2** short. **Likely** batch scoring needs **n≥3** and **first-chest-time** stratification.

## Went well

- **0:12–1:32**: Gravy Heart picks **77–94%** on level-ups; max HP climbs **120→178** by **1:32** without food goals — regen/gravy curve matches champion opener picks.
- **0:58–1:01**, **1:44**, **2:12**, **2:37**: Beetle Nest channels **charged and used** with modest hp cost (e.g. **1:01** +5 hp cave-grub).
- **2:24**: Crop Patch **P154** charged and used (+gold **31** per goal row) — spot loop works when planner switches.

## Went poorly

- **0:00–2:00**: Pure explore (**10 drops**) with **no chest ever listed** — directive rule 1 never fires; strength stays on starter weapons.
- **2:00–2:06**: Amusing at **2:00**; explore continues; **2:02** single step **-20** amusing, **2:05–2:13** further amusing chips — no boss-within-200 goal lines on exploit stack (unlike E105).
- **3:38–3:41**: **Boss Lair** charging **2.7/3 s** then **dropped** for explore when **Late Blight** appeared — abandoned near-big-chest for explore **up-right**.
- **3:50–3:59**: **~79→2 hp** in ten seconds with **amusing**, **late-blight**, **beetle-queen**, **harvest-mouse 16.4**, **field-crow** — no chest, no evolution, no food in log at **3:55** first under 25%.

## Moments

- **0:00** Explore up-right starts; plan scores explore **51%** over charge spots **15–45%** — right call for directive until chest exists; seed never cooperates.
- **0:58** Beetle Nest **45%** wins over explore — **right call** for spot gold/elite lane.
- **1:32** Dash on explore at **enemies_near 7** — **right call** (B28-style); hp stable **148/163**.
- **2:00** Amusing appears; planner still **explore down-right 52%** — **should have** evade/keep-away if E105 lines were active; exploit templates omit them.
- **2:02** Walk right ruled out; up-right path loses **20 hp** amusing — **should have** distrustBossRange or evade goal; **distrustBossRange 0**.
- **2:06** Beetle Nest goal at **50%** amid amusing — reasonable spot play; no chest drop logged.
- **3:00** Colorado Queen; health **98/178** — still explore-heavy; minute table **130 lost** in minute 3.
- **3:30** Skipping Cannonball level-up — dilutes build without chest evolutions — **right call** for generic pick question but weak for campaign.
- **3:38** Boss Lair **2.7/3 s** charge, planner drops for explore — **should have** finished lair or evaded blight before explore.
- **3:50** Beetle Nest done at **79 hp** with three bosses up — last spot success before collapse.
- **3:51** Dash **down** at **56 hp** loses **16** harvest-mouse — dash fired; direction costly.
- **3:55** Inside Spud Shrine **1/5 s** charge, health **36**, switches to Crop Patch — too late; **should have** evaded not charged.
- **3:59** Dies **2 hp** walking toward crop with **field-crow 22** in window — **right call** impossible; run already lost.

## Questions

- Do **elite fight goals** after **2:00** on chest-never seeds list a first chest before amusing (**E107**)?
- Does **distrustBossRange 400** on exploit stack cut **amusing 67.6** below fight-elite baseline (**E106**)?
- Can **E60 elite preference** produce a kill and chest drop before **2:30** when explore never finds a chest (**E90**)?

## Next

1. **E107** on a **chest-starved** seed (10T7HER class or **1BGLAXR**): champion + **E60** elite-after-2:00 + optional **E105** boss evade in `planner.goal` — moves campaign by testing the only chest source when explore fails.
2. **E106** exploit or planned: same opener failure seed with **`distrustBossRange 400`** only — isolates amusing forecast misses without changing planner.
3. **Third exploit** with champion templates (per campaign rhythm) — score **E103** with **first chest time** and **opens by 2:30** alongside survival.

## Beliefs changed

- **B49**: evidence adds **10T7HER** exploit (**never** listed chest, **3:59**); confidence stays **likely**.
- **B103**: evidence adds exploit **3:59** after **1:53**; claim unchanged; status **held**, confidence **lead** → **likely** (two short exploits, same stack).
- **B35**: no change; this run is **tail** on chest-never seed, not contradiction of **16:32–17:41** band.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:12** level-up: took Gravy Heart from Hash Rush, Masher Grip, Gravy Heart.
- **0:12** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **0:27** level-up: took Skipping Cannonball from Sour Cream, Starch Plating, Skipping Cannonball.
- **0:27** gained without a pick (a chest or other): Skipping Cannonball 1/8 new.
- **0:36** level-up: took Gravy Heart from Salt Line, Skipping Cannonball, Gravy Heart.
- **0:36** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:12** level-up: took Gravy Heart from Clean Plate, Hot Streak, Gravy Heart.
- **1:12** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.
- **1:32** level-up: took Gravy Heart from Mash Snowball, Gravy Heart, Tater Tot Pup.
- **1:32** gained without a pick (a chest or other): Gravy Heart 3/5 to 4/5.
- **3:30** level-up: took Skipping Cannonball from Aged Russet, Sprout Squad, Skipping Cannonball.
- **3:30** gained without a pick (a chest or other): Skipping Cannonball 1/8 to 2/8.

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
  "eliteSeconds": 20
}
~~~
