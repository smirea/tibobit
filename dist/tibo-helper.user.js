// ==UserScript==
// @name         tibo.dog combo helper
// @namespace    https://github.com/smirea/tibobit
// @version      1.0.0.20261106
// @description  Lists the evolutions your current loadout can reach and annotates level-up cards with combos and undiscovered picks.
// @match        https://tibo.dog/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js
// ==/UserScript==
(() => {
  // src/catalog.generated.json
  var catalog_generated_default = {
    build: "main-B_rdgvB2.js",
    extractedAt: "2026-11-06",
    names: {
      "item:all-seeing-spud": "All-Seeing Spud",
      "item:baked-buckler": "Baked Buckler",
      "item:bonfire-spud": "Bonfire Spud",
      "item:boom-spud": "Boom Spud",
      "item:boss-buster": "Boss Buster",
      "item:chive-charm": "Chive Charm",
      "item:coal-baked-spud": "Coal-Baked Spud",
      "item:compost-tea": "Compost Tea",
      "item:copper-spoon": "Copper Spoon",
      "item:coupon-book": "Coupon Book",
      "item:crit-chip": "Crit Chip",
      "item:cursed-crown": "Cursed Crown",
      "item:extra-eye": "Extra Eye",
      "item:freezer-burn": "Freezer Burn",
      "item:frozen-pea": "Frozen Pea",
      "item:fry-box": "Fry Box",
      "item:fry-fuel": "Fry Fuel",
      "item:fry-volcano": "Fry Volcano",
      "item:ghost-pepper": "Ghost Pepper",
      "item:ghost-skin": "Ghost Skin",
      "item:glacier-spud": "Glacier Spud",
      "item:golden-gravy": "Golden Gravy",
      "item:heavy-russet": "Heavy Russet",
      "item:hot-pepper": "Hot Pepper",
      "item:kaboom-spud": "Kaboom Spud",
      "item:lightning-spud": "Lightning Spud",
      "item:lucky-peel": "Lucky Peel",
      "item:magma-croquette": "Magma Croquette",
      "item:mash-crater": "Mash Crater",
      "item:mash-splat": "Mash Splat",
      "item:meteor-russet": "Meteor Russet",
      "item:midnight-fries": "Midnight Fries",
      "item:moon-dust": "Moon Dust",
      "item:penny-spud": "Penny Spud",
      "item:philosophers-potato": "Philosopher's Potato",
      "item:pickle-jar": "Pickle Jar",
      "item:porcupine-spud": "Porcupine Spud",
      "item:potato-knish": "Potato Knish",
      "item:receipt-spud": "Receipt Spud",
      "item:salt-crystal": "Salt Crystal",
      "item:second-spud": "Second Spud",
      "item:sharp-peeler": "Sharp Peeler",
      "item:souffle-spud": "Soufflé Spud",
      "item:spicy-croquette": "Spicy Croquette",
      "item:spud-muffin": "Spud Muffin",
      "item:spud-spring": "Spud Spring",
      "item:starch-sock": "Starch Sock",
      "item:static-socks": "Static Socks",
      "item:static-tot": "Static Tot",
      "item:storm-tot": "Storm Tot",
      "item:tailwind-tater": "Tailwind Tater",
      "item:tater-treat": "Tater Treat",
      "item:thorny-jacket": "Thorny Jacket",
      "item:time-tuber": "Time Tuber",
      "item:vampire-tot": "Vampire Tot",
      "item:wandering-eyes": "Wandering Eyes",
      "item:wide-ladle": "Wide Ladle",
      "passive:bacon-bits": "Bacon Bits",
      "passive:big-bowl": "Big Bowl",
      "passive:butter-pat": "Butter Pat",
      "passive:butter-socks": "Butter Socks",
      "passive:chives": "Chives",
      "passive:couch-potato": "Couch Potato",
      "passive:fertilizer": "Fertilizer",
      "passive:four-eyed-spud": "Four-Eyed Spud",
      "passive:golden-fry": "Golden Fry",
      "passive:gpu": "GPU",
      "passive:gravy-heart": "Gravy Heart",
      "passive:gravy-splash": "Gravy Splash",
      "passive:hash-rush": "Hash Rush",
      "passive:hearty-helping": "Hearty Helping",
      "passive:hot-sauce": "Hot Sauce",
      "passive:hot-start": "Hot Start",
      "passive:lean-lunch": "Lean Lunch",
      "passive:mash-finisher": "Mash Finisher",
      "passive:masher-grip": "Masher Grip",
      "passive:packed-pan": "Packed Pan",
      "passive:peel-out": "Peel Out",
      "passive:potato-magnet": "Potato Magnet",
      "passive:root-network": "Root Network",
      "passive:rotten-spud": "Rotten Spud",
      "passive:salt-shaker": "Salt Shaker",
      "passive:slow-cooker": "Slow Cooker",
      "passive:sour-cream": "Sour Cream",
      "passive:sprouting-eyes": "Sprouting Eyes",
      "passive:spry-sprout": "Spry Sprout",
      "passive:spud-sneakers": "Spud Sneakers",
      "passive:starch-plating": "Starch Plating",
      "passive:stuffed-skin": "Stuffed Skin",
      "passive:tater-trot": "Tater Trot",
      "passive:thick-skin": "Thick Skin",
      "weapon:afterburner-fries": "Afterburner Fries",
      "weapon:baked-alaska": "Baked Alaska",
      "weapon:big-fry": "Big Fry",
      "weapon:bottomless-sack": "Bottomless Sack",
      "weapon:broadside": "Broadside",
      "weapon:butter-streak": "Butter Streak",
      "weapon:cast-iron": "Cast Iron",
      "weapon:chip-shuriken": "Chip Shuriken",
      "weapon:cold-storage": "Cold Storage",
      "weapon:comet-scythe": "Comet Scythe",
      "weapon:deep-fryer": "Deep Fryer",
      "weapon:eternal-sprouts": "Eternal Sprouts",
      "weapon:factory-reset": "Factory Reset",
      "weapon:frozen-fries": "Frozen Fries",
      "weapon:fry-brigade": "Fry Brigade",
      "weapon:fry-fortress": "Fry Fortress",
      "weapon:fry-knives": "Fry Knives",
      "weapon:fry-lance": "Fry Lance",
      "weapon:fry-sentry": "Fry Cook Sentry",
      "weapon:frying-pan": "Frying Pan",
      "weapon:gem-catapult": "Gem Catapult",
      "weapon:gem-sling": "Gem Sling",
      "weapon:ghee-glide": "Ghee Glide",
      "weapon:golden-harvest": "Golden Harvest",
      "weapon:grab-bag": "Grab Bag",
      "weapon:gratin-arc": "Gratin Arc",
      "weapon:gravy-boat": "Gravy Boat",
      "weapon:gravy-flood": "Gravy Flood",
      "weapon:gravy-pack": "Gravy Pack",
      "weapon:harvest-moon": "Harvest Moon",
      "weapon:hash-boomerang": "Hash Boomerang",
      "weapon:hash-brown-shield": "Hash Brown Shield",
      "weapon:hash-bulwark": "Hash Bulwark",
      "weapon:hash-harrier": "Hash Harrier",
      "weapon:hash-hawk": "Hash Hawk",
      "weapon:hashnado": "Hashnado",
      "weapon:hot-potato": "Hot Potato",
      "weapon:hot-streak": "Hot Streak",
      "weapon:hunters-moon": "Hunter's Moon",
      "weapon:inferno-basket": "Inferno Basket",
      "weapon:jet-fryer": "Jet Fryer",
      "weapon:julienne-dash": "Julienne Dash",
      "weapon:kettle-cyclone": "Kettle Cyclone",
      "weapon:landmine-harvest": "Landmine Harvest",
      "weapon:loaded-dice": "Loaded Dice",
      "weapon:locked-gatling": "Locked Gatling",
      "weapon:mandoline-fury": "Mandoline Fury",
      "weapon:mash-avalanche": "Mash Avalanche",
      "weapon:mash-colossus": "Mash Colossus",
      "weapon:mash-golem": "Mash Golem",
      "weapon:mash-landing": "Mash Landing",
      "weapon:mash-snowball": "Mash Snowball",
      "weapon:mash-wave": "Mash Wave",
      "weapon:mashquake": "Mashquake",
      "weapon:mezzaluna": "Mezzaluna",
      "weapon:moon-cleaver": "Moon Cleaver",
      "weapon:overgrowth": "Overgrowth",
      "weapon:peel-phantom": "Peel Phantom",
      "weapon:peel-poltergeist": "Peel Poltergeist",
      "weapon:peeler": "Peeler",
      "weapon:permafrost-fries": "Permafrost Fries",
      "weapon:potato-battery": "Potato Battery",
      "weapon:potato-patch": "Potato Patch",
      "weapon:potato-rain": "Potato Rain",
      "weapon:pressure-cooker": "Pressure Cooker",
      "weapon:railfry": "Railfry",
      "weapon:reset-button": "Reset Button",
      "weapon:root-cellar": "Root Cellar",
      "weapon:root-spikes": "Root Spikes",
      "weapon:rosti-disc": "Rösti Disc",
      "weapon:rosti-storm": "Rösti Storm",
      "weapon:sack-of-russets": "Sack of Russets",
      "weapon:salt-flats": "Salt Flats",
      "weapon:salt-line": "Salt Line",
      "weapon:seed-potato": "Seed Potato",
      "weapon:seeker-sprouts": "Seeker Sprouts",
      "weapon:skipping-cannonball": "Skipping Cannonball",
      "weapon:small-fry": "Small Fry",
      "weapon:spark-corral": "Spark Corral",
      "weapon:spicy-hot-potato": "Spicy Hot Potato",
      "weapon:sprout-satellites": "Sprout Satellites",
      "weapon:sprout-squad": "Sprout Squad",
      "weapon:spud-artillery": "Spud Artillery",
      "weapon:spud-cannon": "Spud Cannon",
      "weapon:spud-decoy": "Spud Decoy",
      "weapon:spud-dice": "Spud Dice",
      "weapon:spud-fence": "Spud Fence",
      "weapon:spud-grid": "Spud Grid",
      "weapon:spud-lob": "Spud Lob",
      "weapon:spudzooka": "Spudzooka",
      "weapon:stand-mixer": "Stand Mixer",
      "weapon:starch-bolt": "Starch Bolt",
      "weapon:starch-chain": "Starch Chain",
      "weapon:starch-supercell": "Starch Supercell",
      "weapon:steam-vent": "Steam Vent",
      "weapon:tailgate-fries": "Tailgate Fries",
      "weapon:tailgate-party": "Tailgate Party",
      "weapon:taproot-eruption": "Taproot Eruption",
      "weapon:tater-mines": "Tater Mines",
      "weapon:tater-minigun": "Tater Minigun",
      "weapon:tater-pup": "Tater Tot Pup",
      "weapon:tater-twirl": "Tater Twirl",
      "weapon:tater-twister": "Tater Twister",
      "weapon:thousand-fries": "Thousand Fries",
      "weapon:thunder-tuber": "Thunder Tuber",
      "weapon:tot-cavalry": "Tot Cavalry",
      "weapon:tot-gatling": "Tot Gatling",
      "weapon:tot-stampede": "Tot Stampede",
      "weapon:tot-toss": "Tot Toss",
      "weapon:waffle-cut": "Waffle Cut",
      "weapon:whisk-vortex": "Whisk Vortex",
      "weapon:wildfire-roast": "Wildfire Roast"
    },
    maxLevel: {
      "passive:bacon-bits": 5,
      "passive:big-bowl": 5,
      "passive:butter-pat": 5,
      "passive:butter-socks": 5,
      "passive:chives": 5,
      "passive:couch-potato": 5,
      "passive:fertilizer": 5,
      "passive:four-eyed-spud": 5,
      "passive:golden-fry": 5,
      "passive:gpu": 5,
      "passive:gravy-heart": 5,
      "passive:gravy-splash": 5,
      "passive:hash-rush": 5,
      "passive:hearty-helping": 5,
      "passive:hot-sauce": 5,
      "passive:hot-start": 5,
      "passive:lean-lunch": 5,
      "passive:mash-finisher": 5,
      "passive:masher-grip": 5,
      "passive:packed-pan": 5,
      "passive:peel-out": 5,
      "passive:potato-magnet": 5,
      "passive:root-network": 5,
      "passive:rotten-spud": 5,
      "passive:salt-shaker": 5,
      "passive:slow-cooker": 5,
      "passive:sour-cream": 5,
      "passive:sprouting-eyes": 5,
      "passive:spry-sprout": 5,
      "passive:spud-sneakers": 5,
      "passive:starch-plating": 5,
      "passive:stuffed-skin": 5,
      "passive:tater-trot": 5,
      "passive:thick-skin": 5,
      "weapon:afterburner-fries": 8,
      "weapon:broadside": 8,
      "weapon:butter-streak": 8,
      "weapon:chip-shuriken": 8,
      "weapon:comet-scythe": 8,
      "weapon:deep-fryer": 8,
      "weapon:frozen-fries": 8,
      "weapon:fry-knives": 8,
      "weapon:fry-lance": 8,
      "weapon:fry-sentry": 8,
      "weapon:frying-pan": 8,
      "weapon:gem-sling": 8,
      "weapon:grab-bag": 8,
      "weapon:gravy-boat": 8,
      "weapon:harvest-moon": 8,
      "weapon:hash-boomerang": 8,
      "weapon:hash-brown-shield": 8,
      "weapon:hash-hawk": 8,
      "weapon:hot-potato": 8,
      "weapon:hot-streak": 8,
      "weapon:julienne-dash": 8,
      "weapon:locked-gatling": 8,
      "weapon:mash-golem": 8,
      "weapon:mash-landing": 8,
      "weapon:mash-snowball": 8,
      "weapon:mash-wave": 8,
      "weapon:mezzaluna": 8,
      "weapon:peel-phantom": 8,
      "weapon:peeler": 8,
      "weapon:potato-battery": 8,
      "weapon:potato-rain": 8,
      "weapon:reset-button": 8,
      "weapon:root-cellar": 8,
      "weapon:root-spikes": 8,
      "weapon:rosti-disc": 8,
      "weapon:salt-line": 8,
      "weapon:seed-potato": 8,
      "weapon:seeker-sprouts": 8,
      "weapon:skipping-cannonball": 8,
      "weapon:small-fry": 8,
      "weapon:sprout-satellites": 8,
      "weapon:sprout-squad": 8,
      "weapon:spud-cannon": 8,
      "weapon:spud-decoy": 8,
      "weapon:spud-dice": 8,
      "weapon:spud-fence": 8,
      "weapon:spud-lob": 8,
      "weapon:starch-bolt": 8,
      "weapon:starch-chain": 8,
      "weapon:steam-vent": 8,
      "weapon:tailgate-fries": 8,
      "weapon:tater-mines": 8,
      "weapon:tater-pup": 8,
      "weapon:tater-twirl": 8,
      "weapon:tot-stampede": 8,
      "weapon:tot-toss": 8,
      "weapon:whisk-vortex": 8
    },
    recipes: [
      {
        kind: "itemEvolution",
        item: "wandering-eyes",
        catalyst: "four-eyed-spud",
        result: "all-seeing-spud"
      },
      {
        kind: "union",
        weapons: [
          "permafrost-fries",
          "spicy-hot-potato"
        ],
        result: "baked-alaska"
      },
      {
        kind: "evolution",
        weapon: "small-fry",
        catalyst: "fertilizer",
        result: "big-fry"
      },
      {
        kind: "itemEvolution",
        item: "coal-baked-spud",
        catalyst: "hot-sauce",
        result: "bonfire-spud"
      },
      {
        kind: "evolution",
        weapon: "grab-bag",
        catalyst: "sprouting-eyes",
        result: "bottomless-sack"
      },
      {
        kind: "evolution",
        weapon: "frying-pan",
        catalyst: "starch-plating",
        result: "cast-iron"
      },
      {
        kind: "evolution",
        weapon: "root-cellar",
        catalyst: "slow-cooker",
        result: "cold-storage"
      },
      {
        kind: "evolution",
        weapon: "sprout-satellites",
        catalyst: "slow-cooker",
        result: "eternal-sprouts"
      },
      {
        kind: "evolution",
        weapon: "reset-button",
        catalyst: "four-eyed-spud",
        result: "factory-reset"
      },
      {
        kind: "union",
        weapons: [
          "fry-fortress",
          "gravy-pack"
        ],
        result: "fry-brigade"
      },
      {
        kind: "evolution",
        weapon: "fry-sentry",
        catalyst: "slow-cooker",
        result: "fry-fortress"
      },
      {
        kind: "itemEvolution",
        item: "porcupine-spud",
        catalyst: "starch-plating",
        result: "fry-volcano"
      },
      {
        kind: "evolution",
        weapon: "gem-sling",
        catalyst: "potato-magnet",
        result: "gem-catapult"
      },
      {
        kind: "evolution",
        weapon: "butter-streak",
        catalyst: "spud-sneakers",
        result: "ghee-glide"
      },
      {
        kind: "itemEvolution",
        item: "freezer-burn",
        catalyst: "slow-cooker",
        result: "glacier-spud"
      },
      {
        kind: "evolution",
        weapon: "potato-rain",
        catalyst: "golden-fry",
        result: "golden-harvest"
      },
      {
        kind: "evolution",
        weapon: "starch-chain",
        catalyst: "hot-sauce",
        result: "gratin-arc"
      },
      {
        kind: "evolution",
        weapon: "gravy-boat",
        catalyst: "potato-magnet",
        result: "gravy-flood"
      },
      {
        kind: "evolution",
        weapon: "tater-pup",
        catalyst: "gravy-heart",
        result: "gravy-pack"
      },
      {
        kind: "evolution",
        weapon: "hash-brown-shield",
        catalyst: "starch-plating",
        result: "hash-bulwark"
      },
      {
        kind: "evolution",
        weapon: "hash-hawk",
        catalyst: "bacon-bits",
        result: "hash-harrier"
      },
      {
        kind: "evolution",
        weapon: "hash-boomerang",
        catalyst: "sour-cream",
        result: "hashnado"
      },
      {
        kind: "evolution",
        weapon: "harvest-moon",
        catalyst: "potato-magnet",
        result: "hunters-moon"
      },
      {
        kind: "evolution",
        weapon: "deep-fryer",
        catalyst: "bacon-bits",
        result: "inferno-basket"
      },
      {
        kind: "evolution",
        weapon: "afterburner-fries",
        catalyst: "hot-start",
        result: "jet-fryer"
      },
      {
        kind: "itemEvolution",
        item: "boom-spud",
        catalyst: "rotten-spud",
        result: "kaboom-spud"
      },
      {
        kind: "evolution",
        weapon: "chip-shuriken",
        catalyst: "gpu",
        result: "kettle-cyclone"
      },
      {
        kind: "evolution",
        weapon: "tater-mines",
        catalyst: "rotten-spud",
        result: "landmine-harvest"
      },
      {
        kind: "evolution",
        weapon: "spud-dice",
        catalyst: "four-eyed-spud",
        result: "loaded-dice"
      },
      {
        kind: "itemEvolution",
        item: "spicy-croquette",
        catalyst: "big-bowl",
        result: "magma-croquette"
      },
      {
        kind: "evolution",
        weapon: "peeler",
        catalyst: "gravy-heart",
        result: "mandoline-fury"
      },
      {
        kind: "evolution",
        weapon: "mash-snowball",
        catalyst: "masher-grip",
        result: "mash-avalanche"
      },
      {
        kind: "evolution",
        weapon: "mash-golem",
        catalyst: "stuffed-skin",
        result: "mash-colossus"
      },
      {
        kind: "itemEvolution",
        item: "mash-splat",
        catalyst: "butter-socks",
        result: "mash-crater"
      },
      {
        kind: "evolution",
        weapon: "mash-wave",
        catalyst: "big-bowl",
        result: "mashquake"
      },
      {
        kind: "itemEvolution",
        item: "heavy-russet",
        catalyst: "masher-grip",
        result: "meteor-russet"
      },
      {
        kind: "evolution",
        weapon: "mezzaluna",
        catalyst: "rotten-spud",
        result: "moon-cleaver"
      },
      {
        kind: "evolution",
        weapon: "seeker-sprouts",
        catalyst: "fertilizer",
        result: "overgrowth"
      },
      {
        kind: "evolution",
        weapon: "peel-phantom",
        catalyst: "peel-out",
        result: "peel-poltergeist"
      },
      {
        kind: "evolution",
        weapon: "frozen-fries",
        catalyst: "thick-skin",
        result: "permafrost-fries"
      },
      {
        kind: "evolution",
        weapon: "seed-potato",
        catalyst: "fertilizer",
        result: "potato-patch"
      },
      {
        kind: "evolution",
        weapon: "steam-vent",
        catalyst: "root-network",
        result: "pressure-cooker"
      },
      {
        kind: "evolution",
        weapon: "fry-lance",
        catalyst: "spud-sneakers",
        result: "railfry"
      },
      {
        kind: "evolution",
        weapon: "rosti-disc",
        catalyst: "starch-plating",
        result: "rosti-storm"
      },
      {
        kind: "evolution",
        weapon: "spud-lob",
        catalyst: "butter-pat",
        result: "sack-of-russets"
      },
      {
        kind: "evolution",
        weapon: "salt-line",
        catalyst: "spud-sneakers",
        result: "salt-flats"
      },
      {
        kind: "evolution",
        weapon: "spud-fence",
        catalyst: "gpu",
        result: "spark-corral"
      },
      {
        kind: "evolution",
        weapon: "hot-potato",
        catalyst: "hot-sauce",
        result: "spicy-hot-potato"
      },
      {
        kind: "union",
        weapons: [
          "sack-of-russets",
          "spudzooka"
        ],
        result: "spud-artillery"
      },
      {
        kind: "evolution",
        weapon: "potato-battery",
        catalyst: "root-network",
        result: "spud-grid"
      },
      {
        kind: "evolution",
        weapon: "spud-cannon",
        catalyst: "hot-sauce",
        result: "spudzooka"
      },
      {
        kind: "evolution",
        weapon: "whisk-vortex",
        catalyst: "big-bowl",
        result: "stand-mixer"
      },
      {
        kind: "union",
        weapons: [
          "thunder-tuber",
          "gratin-arc"
        ],
        result: "starch-supercell"
      },
      {
        kind: "itemEvolution",
        item: "static-tot",
        catalyst: "root-network",
        result: "storm-tot"
      },
      {
        kind: "evolution",
        weapon: "tailgate-fries",
        catalyst: "butter-pat",
        result: "tailgate-party"
      },
      {
        kind: "evolution",
        weapon: "root-spikes",
        catalyst: "masher-grip",
        result: "taproot-eruption"
      },
      {
        kind: "evolution",
        weapon: "locked-gatling",
        catalyst: "masher-grip",
        result: "tater-minigun"
      },
      {
        kind: "evolution",
        weapon: "tater-twirl",
        catalyst: "salt-shaker",
        result: "tater-twister"
      },
      {
        kind: "evolution",
        weapon: "fry-knives",
        catalyst: "salt-shaker",
        result: "thousand-fries"
      },
      {
        kind: "evolution",
        weapon: "starch-bolt",
        catalyst: "sprouting-eyes",
        result: "thunder-tuber"
      },
      {
        kind: "evolution",
        weapon: "tot-stampede",
        catalyst: "butter-socks",
        result: "tot-cavalry"
      },
      {
        kind: "evolution",
        weapon: "tot-toss",
        catalyst: "chives",
        result: "tot-gatling"
      },
      {
        kind: "evolution",
        weapon: "julienne-dash",
        catalyst: "butter-socks",
        result: "waffle-cut"
      },
      {
        kind: "evolution",
        weapon: "hot-streak",
        catalyst: "thick-skin",
        result: "wildfire-roast"
      }
    ]
  };

  // src/catalog.ts
  function toCombo(r) {
    switch (r.kind) {
      case "evolution":
        return {
          recipe: r,
          result: `weapon:${r.result}`,
          parts: [
            { key: `weapon:${r.weapon}`, need: "max" },
            { key: `passive:${r.catalyst}`, need: "own" }
          ]
        };
      case "union":
        return {
          recipe: r,
          result: `weapon:${r.result}`,
          parts: [
            { key: `weapon:${r.weapons[0]}`, need: "own" },
            { key: `weapon:${r.weapons[1]}`, need: "own" }
          ]
        };
      case "itemEvolution":
        return {
          recipe: r,
          result: `item:${r.result}`,
          parts: [
            { key: `item:${r.item}`, need: "own" },
            { key: `passive:${r.catalyst}`, need: "max" }
          ]
        };
    }
  }
  function partState(part, loadout, catalog) {
    const have = loadout.get(part.key);
    if (have === undefined)
      return "missing";
    if (part.need === "own")
      return "done";
    return have >= (catalog.maxLevel[part.key] ?? 1) ? "done" : "leveling";
  }
  function comboProgress(combo, loadout, catalog) {
    return combo.parts.map((p) => partState(p, loadout, catalog));
  }
  function combosUsing(combos, key) {
    return combos.filter((c) => c.parts.some((p) => p.key === key));
  }
  function partner(combo, key) {
    const [a, b] = combo.parts;
    return a.key === key ? b : a;
  }
  function relevantCombos(combos, loadout) {
    return combos.filter((c) => !loadout.has(c.result) && c.parts.some((p) => loadout.has(p.key)));
  }
  function nameOf(catalog, key) {
    return catalog.names[key] ?? key.slice(key.indexOf(":") + 1);
  }

  // src/style.ts
  var css = `
.tbh-panel {
  position: fixed; top: 52px; right: 8px; z-index: 2147483000;
  width: min(300px, calc(100vw - 16px)); max-height: calc(100vh - 120px); overflow: auto;
  background: rgba(17, 14, 10, 0.88); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  touch-action: auto; user-select: none;
}
.tbh-panel[hidden] { display: none; }
.tbh-panel.tbh-collapsed:not(.tbh-choice), .tbh-panel.tbh-choice:not(.tbh-peek) { width: auto; }
.tbh-collapsed .tbh-header, .tbh-choice:not(.tbh-peek) .tbh-header { gap: 12px; }
@media (max-width: 699px) {
  .tbh-panel { top: 100px; }
  .tbh-panel.tbh-choice { display: none; }
}
.tbh-header { display: flex; justify-content: space-between; padding: 6px 8px; cursor: pointer; font-weight: 700; color: #ffd36b; position: sticky; top: 0; background: rgba(17,14,10,.96); }
.tbh-count { color: #c9b58a; font-weight: 400; }
.tbh-collapsed:not(.tbh-choice) :is(.tbh-body, .tbh-stale),
.tbh-choice:not(.tbh-peek) :is(.tbh-body, .tbh-stale) { display: none; }
.tbh-body { padding: 0 6px 6px; }
.tbh-empty { color: #a8977a; padding: 4px 2px; }
.tbh-row { padding: 5px 6px; margin-top: 4px; border-radius: 4px; background: rgba(255,255,255,.04); border-left: 3px solid #5d4c2e; }
.tbh-row.tbh-ready { border-left-color: #5ee8a0; background: rgba(94,232,160,.10); }
.tbh-row-head { display: flex; justify-content: space-between; gap: 6px; align-items: baseline; }
.tbh-result { font-weight: 700; color: #ffe9b0; }
.tbh-kind { font-size: 10px; color: #a8977a; text-transform: uppercase; letter-spacing: .05em; }
.tbh-ready .tbh-kind, .tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
.tbh-parts { display: flex; flex-wrap: wrap; gap: 2px 6px; margin-top: 2px; }
.tbh-plus, .tbh-arrow { color: #8d7c5c; }
.tbh-done { color: #7fe3a4; }
.tbh-leveling { color: #ffcf5a; }
.tbh-missing { color: #e38a7f; }
.tbh-via { font-size: 10.5px; color: #a8977a; margin-top: 2px; }
.tbh-stale { margin: 0 6px 6px; padding: 4px 6px; border-radius: 4px; background: rgba(227,138,127,.15); color: #f0b3aa; font-size: 11px; }
.tbh-badge { display: inline-block; margin-left: 5px; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; vertical-align: 1px; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }

.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 1px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; flex-wrap: wrap; gap: 0 5px; align-items: baseline; opacity: .7; }
.tbh-line.tbh-match { opacity: 1; color: #f3e6c4; }
`;

  // src/main.ts
  var catalog = catalog_generated_default;
  var combos = catalog.recipes.map(toCombo);
  var itemIds = new Set(Object.keys(catalog.names).filter((k) => k.startsWith("item:")).map((k) => k.slice(5)));
  var heldItems;
  var nativeSet = Map.prototype.set;
  Map.prototype.set = function(key, value) {
    if (typeof key === "string" && typeof value === "number" && itemIds.has(key))
      heldItems = this;
    return nativeSet.call(this, key, value);
  };
  var DISCOVERY_KEY = "tibo.discovery.v1";
  var EVOLUTIONS_KEY = "tibo.evolutions.v1";
  function parseDiscovery(raw) {
    const out = new Set;
    try {
      const d = JSON.parse(raw ?? "{}");
      for (const kind of ["weapon", "passive", "item"])
        for (const id of d[kind] ?? [])
          out.add(`${kind}:${id}`);
    } catch {}
    return out;
  }

  class Discovery {
    known = parseDiscovery(localStorage.getItem(DISCOVERY_KEY));
    pending = new Map;
    constructor() {
      const nativeSetItem = Storage.prototype.setItem;
      const track = (value) => {
        for (const key of parseDiscovery(value))
          if (!this.known.has(key) && !this.pending.has(key))
            this.pending.set(key, "unseen");
      };
      Storage.prototype.setItem = function(name, value) {
        if (name === DISCOVERY_KEY)
          track(value);
        return nativeSetItem.call(this, name, value);
      };
    }
    isNew(key) {
      return !this.known.has(key);
    }
    made(result) {
      try {
        const ids = JSON.parse(localStorage.getItem(EVOLUTIONS_KEY) ?? "[]");
        return ids.includes(result.slice(result.indexOf(":") + 1));
      } catch {
        return false;
      }
    }
    settle(loadout, onScreen) {
      for (const [key, state] of this.pending) {
        if (loadout.has(key) || state === "shown" && !onScreen.has(key)) {
          this.known.add(key);
          this.pending.delete(key);
        } else if (onScreen.has(key))
          this.pending.set(key, "shown");
      }
    }
    get version() {
      return `${this.known.size}/${this.pending.size}`;
    }
  }
  var discovery = new Discovery;
  function slotLevel(slot) {
    const text = slot.querySelector(".hud-slot-lv")?.textContent ?? "";
    const n = Number.parseInt(text, 10);
    return Number.isFinite(n) ? n : 1;
  }
  function readLoadout() {
    const weapons = document.querySelector(".hud-weapons");
    if (weapons === null || !isShown(weapons))
      return;
    const loadout = new Map;
    for (const slot of document.querySelectorAll(".hud-weapons > .hud-slot[data-tip], .hud-passives > .hud-slot[data-tip]")) {
      if (slot.hidden)
        continue;
      const tip = slot.dataset.tip ?? "";
      if (tip.startsWith("weapon:") || tip.startsWith("passive:"))
        loadout.set(tip, slotLevel(slot));
    }
    for (const [id, count] of heldItems ?? [])
      if (count > 0)
        loadout.set(`item:${id}`, count);
    return loadout;
  }
  function isShown(el) {
    return el.getClientRects().length > 0;
  }
  var lastWeaponCount = 0;
  function trackRunReset(loadout) {
    const weapons = loadout === undefined ? 0 : [...loadout.keys()].filter((k) => k.startsWith("weapon:")).length;
    if (weapons < lastWeaponCount)
      heldItems = undefined;
    lastWeaponCount = weapons;
  }
  function h(tag, className, ...children) {
    const el = document.createElement(tag);
    el.className = className;
    el.append(...children);
    return el;
  }
  var STATE_MARK = { done: "✓", leveling: "▲", missing: "✗" };
  function partLabel(part, loadout) {
    const state = partState(part, loadout, catalog);
    const max = catalog.maxLevel[part.key];
    let detail = "";
    if (part.need === "max" && max !== undefined) {
      const have = loadout.get(part.key);
      detail = have === undefined ? ` Lv${max}` : ` ${have}/${max}`;
    }
    return h("span", `tbh-part tbh-${state}`, `${STATE_MARK[state]} ${nameOf(catalog, part.key)}${detail}`);
  }
  function resultLabel(combo) {
    const unknown = !discovery.made(combo.result);
    const el = h("span", "tbh-result", nameOf(catalog, combo.result));
    if (unknown)
      el.append(h("span", "tbh-badge tbh-badge-evo", "NEW"));
    return el;
  }
  function readiness(combo, loadout) {
    return comboProgress(combo, loadout, catalog).filter((s) => s === "done").length;
  }
  var KIND_NOTE = {
    evolution: "chest",
    union: "union",
    itemEvolution: "item"
  };
  function missingPath(part, loadout) {
    if (loadout.has(part.key))
      return;
    const via = combos.find((c) => c.result === part.key);
    if (via === undefined)
      return;
    return h("div", "tbh-via", `${nameOf(catalog, part.key)} = ${via.parts.map((p) => nameOf(catalog, p.key)).join(" + ")}`);
  }
  function renderPanel(panel, loadout) {
    const list = relevantCombos(combos, loadout).sort((a, b) => readiness(b, loadout) - readiness(a, loadout) || nameOf(catalog, a.result).localeCompare(nameOf(catalog, b.result)));
    const ready = list.filter((c) => readiness(c, loadout) === 2).length;
    const body = h("div", "tbh-body");
    if (list.length === 0)
      body.append(h("div", "tbh-empty", "No combos use anything you hold yet."));
    for (const combo of list) {
      const isReady = readiness(combo, loadout) === 2;
      const row = h("div", `tbh-row${isReady ? " tbh-ready" : ""}`, h("div", "tbh-row-head", resultLabel(combo), h("span", "tbh-kind", isReady ? "READY" : KIND_NOTE[combo.recipe.kind])), h("div", "tbh-parts", partLabel(combo.parts[0], loadout), h("span", "tbh-plus", "+"), partLabel(combo.parts[1], loadout)));
      for (const p of combo.parts) {
        const via = missingPath(p, loadout);
        if (via !== undefined)
          row.append(via);
      }
      body.append(row);
    }
    const header = h("div", "tbh-header", h("span", "", "Combos"), h("span", "tbh-count", `${ready} ready / ${list.length}`));
    header.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
    panel.replaceChildren(header, body);
    const stale = staleWarning();
    if (stale !== undefined)
      panel.append(h("div", "tbh-stale", stale));
  }
  var unknownIds = new Set;
  function noteUnknown(keys) {
    for (const key of keys)
      if (catalog.names[key] === undefined)
        unknownIds.add(key);
  }
  function staleWarning() {
    if (unknownIds.size === 0)
      return;
    return `The combo data (${catalog.extractedAt}) does not know ${[...unknownIds].join(", ")}. Run \`bun run extract && bun run build\` in tibobit.`;
  }
  function offerKey(card) {
    const tip = card.dataset.tip ?? "";
    const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
    if (offer)
      return { key: `${offer[1]}:${offer[2]}`, level: Number(offer[3]) };
    const item = tip.match(/^item:([a-z0-9-]+)$/);
    if (item)
      return { key: `item:${item[1]}`, level: 1 };
    return;
  }
  function annotateCard(card, loadout) {
    const offer = offerKey(card);
    if (offer === undefined)
      return;
    const signature = `${offer.key}|${[...loadout].join(",")}|${discovery.version}`;
    if (card.dataset.tbh === signature)
      return;
    card.dataset.tbh = signature;
    card.querySelector(".tbh-card")?.remove();
    card.classList.remove("tbh-card-new", "tbh-card-evo");
    const isNew = discovery.isNew(offer.key);
    const after = new Map(loadout);
    after.set(offer.key, offer.key.startsWith("item:") ? (loadout.get(offer.key) ?? 0) + 1 : offer.level);
    const uses = combosUsing(combos, offer.key).filter((c) => !loadout.has(c.result));
    const matches = uses.filter((c) => loadout.has(partner(c, offer.key).key));
    const shown = isNew ? uses : matches;
    const opensUnknown = matches.some((c) => !discovery.made(c.result));
    if (isNew)
      card.classList.add("tbh-card-new");
    if (opensUnknown)
      card.classList.add("tbh-card-evo");
    if (!isNew && shown.length === 0)
      return;
    const box = h("div", "tbh-card");
    if (isNew)
      box.append(h("span", "tbh-badge tbh-badge-new", "UNSEEN"));
    for (const combo of shown.sort((a, b) => Number(matches.includes(b)) - Number(matches.includes(a)))) {
      const other = partner(combo, offer.key);
      const isMatch = matches.includes(combo);
      const readyAfter = comboProgress(combo, after, catalog).every((s) => s === "done");
      box.append(h("div", `tbh-line${isMatch ? " tbh-match" : ""}`, h("span", "tbh-plus", "+"), partLabel(other, loadout), h("span", "tbh-arrow", "→"), resultLabel(combo), ...readyAfter ? [h("span", "tbh-kind tbh-ready-tag", "READY")] : []));
    }
    (card.querySelector(".ui-card-text") ?? card).append(box);
  }
  function mount() {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    const panel = h("div", "tbh-panel");
    panel.id = "tibo-helper";
    if (window.innerWidth < 700)
      panel.classList.add("tbh-collapsed");
    document.body.append(panel);
    return panel;
  }
  function start() {
    const panel = mount();
    let panelSignature = "";
    let queued = false;
    const update = () => {
      queued = false;
      const loadout = readLoadout();
      trackRunReset(loadout);
      panel.hidden = loadout === undefined;
      if (loadout === undefined)
        return;
      const cards = [...document.querySelectorAll(".ui-card[data-tip]")];
      const offered = cards.map(offerKey).filter((o) => o !== undefined);
      discovery.settle(loadout, new Set(offered.map((o) => o.key)));
      noteUnknown(loadout.keys());
      noteUnknown(offered.map((o) => o.key));
      panel.classList.toggle("tbh-choice", offered.length > 0);
      if (offered.length === 0)
        panel.classList.remove("tbh-peek");
      const signature = `${[...loadout].join(",")}|${discovery.version}|${staleWarning() ?? ""}`;
      if (signature !== panelSignature) {
        panelSignature = signature;
        renderPanel(panel, loadout);
      }
      for (const card of cards)
        annotateCard(card, loadout);
    };
    const schedule = () => {
      if (queued)
        return;
      queued = true;
      requestAnimationFrame(update);
    };
    new MutationObserver((records) => {
      if (records.some((r) => !panel.contains(r.target) && !(r.target instanceof Element && r.target.closest(".tbh-card"))))
        schedule();
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["data-tip", "hidden"] });
    setInterval(schedule, 1000);
    schedule();
  }
  if (document.body === null)
    document.addEventListener("DOMContentLoaded", start, { once: true });
  else
    start();
})();
