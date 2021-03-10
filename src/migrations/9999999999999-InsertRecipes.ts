/* eslint-disable no-tabs */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRecipes9999999999999 implements MigrationInterface {
  name = 'InsertData9999999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 07.02.2021
    await queryRunner.query(`INSERT INTO "recipes" VALUES
    (160,	'Simple Baked Eggs',	'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8739148.jpg',	2,	15,	'https://www.allrecipes.com/recipe/273461/simple-baked-eggs/',	'Preheat the oven to 350 degrees F (175 degrees C). Grease 2 ceramic ramekins.
    
    Whisk together eggs, milk, and heavy cream in a bowl until well combined.
    
    Place 1/2 bacon into each prepared ramekin. Pour 1/2 egg mixture into each ramekin. Season with salt and pepper.
    
    Bake in the preheated oven until domed on top, golden, and baked through, about 25 minutes.
    
    While eggs bake, toast bread slices in a toaster to desired doneness. Slice into thin strips; spread with butter. Serve with baked eggs.',	8),
    (163,	'Juicy Roasted Chicken',	'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F389250.jpg',	6,	120,	'https://www.allrecipes.com/recipe/83557/juicy-roasted-chicken/',	'Preheat oven to 350 degrees F (175 degrees C).
    
    Place chicken in a roasting pan, and season generously inside and out with salt and pepper. Sprinkle inside and out with onion powder. Place 3 tablespoons margarine in the chicken cavity. Arrange dollops of the remaining margarine around the chicken''s exterior. Cut the celery into 3 or 4 pieces, and place in the chicken cavity.
    
    Bake uncovered 1 hour and 15 minutes in the preheated oven, to a minimum internal temperature of 180 degrees F (82 degrees C). Remove from heat, and baste with melted margarine and drippings. Cover with aluminum foil, and allow to rest about 30 minutes before serving.',	27),
    (164,	'Skillet Chicken Puttanesca',	'https://www.simplyrecipes.com/thmb/A7kUG-q0HukFyUEQgZgy4JpaUbo=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__06__2017-07-12-ChickenPuttanesca-7-f46f5dd796db48c4916eca28fef063f4.jpg',	4,	40,	'https://www.simplyrecipes.com/recipes/skillet_chicken_puttanesca/',	'Pour the tomatoes into a bowl and crush with your hands or with a wooden spoon until you have uneven 1-inch pieces (you can also use scissors to snip the tomatoes into small pieces).
    
    Mix in the anchovies, olives, capers, red pepper, and 2 tablespoons of the oregano to the bowl. Set aside.
    
    Sprinkle the chicken all over with salt and black pepper. In a large skillet over medium-high heat, heat 2 tablespoons of the olive oil until hot.
    
    Add the chicken and cook without disturbing for 3 minutes, or until browned. If you are using a cast-iron or stainless steel skillet, do not turn until the chicken moves easily without prodding.
    
    Turn and cook the other side for 3 minutes. Transfer to a plate.
    
    In the skillet over medium heat, heat the remaining 1 tablespoon oil. Add the garlic and cook, stirring, for 1 minute.
    
    Add the tomato mixture – be careful since the juices will splutter when you add them to the pan. Cook for 1 minute or until the spluttering stops. Stir well, turn down the heat, and simmer for 5 minutes. Taste for seasoning and add more salt, black pepper, or red pepper, if you like.
    
    Add the chicken breasts and any juices to the skillet and spoon a little sauce over top.
    
    Cover the pan and simmer for 5 to 8 minutes, or until a meat thermometer inserted into the thickest part of the chicken registers 165F.
    
    Serve straight from the skillet or transfer to a serving platter. Sprinkle the remaining 1 tablespoon oregano over the top and garnish with oregano sprigs. Serve with plenty of crusty bread.',	14),
    (165,	'Brown Butter Chocolate Chip Cookies',	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-brownbutterchocolatechipcookie089-210201-sc-1612476612.jpg',	6,	15,	'https://www.delish.com/cooking/recipe-ideas/a35195232/brown-butter-chocolate-chip-cookies/',	'In a small skillet or saucepan over medium heat, melt butter. Stirring occasionally, continue to cook butter and bring to a simmer. Let butter simmer until butter starts to turn golden. Once butter quiets and stops sizzling, give it another stir and check that it has turned a deep golden color. Remove from heat and pour into a medium heatproof bowl, scraping all of the brown bits into the bowl. Let cool for about 15 or 20 minutes.
    
    Add milk powder to browned butter and whisk until dissolved. Add sugars and whisk until combined, then add eggs and vanilla and whisk until creamy.
    
    In another medium bowl, whisk flour, baking soda, and salt together. Add dry ingredients to wet and stir with rubber spatula until just combined. Add chocolate chips and stir to combine.
    
    Cover in plastic wrap and chill for 2 hours.
    
    Preheat oven to 350° and line 2 large baking sheets with parchment. Scoop about 2 tablespoons worth of dough and roll into a ball. Place on prepared baking sheets 2” apart.
    
    Bake until edges are golden and set and middles are still soft 10 to 12 minutes. Let cool on baking sheet for 5 minutes, then transfer to a wire cooling rack to let cool completely.',	2),
    (166,	'Perfect Panna Cotta',	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-pannacotta-030-ls-1612544701.jpg',	4,	120,	'https://www.delish.com/cooking/recipe-ideas/a35195362/panna-cotta-recipe/',	'In a medium saucepan, add milk and sprinkle gelatin in an even layer over entire surface of milk. Let sit for 5 minutes to let gelatin bloom and soften.
    
    Place saucepan over medium heat and begin to whisk gelatin into milk until there are no lumps. Keep whisking occasionally for 2 to 3 minutes to make sure it is completely dissolved. Add cream, sugar, vanilla bean seeds, and a large pinch of salt. Continue whisking, until sugar is dissolved and mixture is warmed through, about 5 minutes. It shouldn’t come to a boil, so lower the heat if the mixture is starting to get too warm. Remove from heat and add lemon peel. Let mixture cool for about 15 minutes and stir occasionally to help cool the mixture down and keep the mixture from separating.
    
    Spray four 6-ounce ramekins with a small amount of cooking spray and use a paper towel to wipe the spray around the bottom and edges of ramekins and wipe out any excess spray. You want a thin coating without any excess pooling in the ramekins. Remove lemon peel from cream mixture and give it one final good whisk. Pour mixture into a large glass measuring cup or other vessel with a spout. Divide mixture evenly between ramekins. Refrigerate until panna cotta is set, at least 4 hours or up to 2 days.
    
    When ready to serve, unmold panna cotta by filling a small bowl with hot water. Dip ramekins, without getting any water in the panna cotta itself, into the hot water for several seconds. Run an offset spatula under hot water, then wipe off with a towel. Run the hot spatula around the edge of the panna cotta, then invert onto the dish you want to serve on. It helps to wiggle to ramekin around a little bit and tap on the bottom to get the panna cotta to fall onto the plate.
    
    Serve with roasted fruit over top.
    
    Preheat oven to 400°. Place fruit into a 9”-x-13” baking pan. Sprinkle sugar and lemon juice on top and toss to combine.
    
    Roast in oven until fruit is soft and juicy, about 20 minutes. Stir fruit halfway through. Let cool down to room temperature before serving.',	14),
    (167,	'Fluffy American pancakes',	'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/fluffyamericanpancak_74828_16x9.jpg',	4,	40,	'https://www.bbc.co.uk/food/recipes/fluffyamericanpancak_74828',	'Sift the flour, baking powder, salt and caster sugar into a large bowl. In a separate bowl or jug, lightly whisk together the milk and egg, then whisk in the melted butter.
    
    lumps will soon disappear with a little mixing. Let the batter stand for a few minutes.
    
    Heat a non-stick frying pan over a medium heat and add a knob of butter. When it''s melted, add a ladle of batter (or two if your frying pan is big enough to cook two pancakes at the same time). It will seem very thick but this is how it should be. Wait until the top of the pancake begins to bubble, then turn it over and cook until both sides are golden brown and the pancake has risen to about 1cm/½in thick.
    
    Repeat until all the batter is used up. You can keep the pancakes warm in a low oven, but they taste best fresh out the pan.
    
    Serve with lashings of real maple syrup and extra butter, if you like.',	2),
    (168,	'Easy ramen noodles',	'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/souped_up_instant_ramen_69512_16x9.jpg',	2,	40,	'https://www.bbc.co.uk/food/recipes/souped_up_instant_ramen_69512',	'Bring a saucepan of water to a rolling boil, carefully lower in the egg and cook for 6½ minutes.
    
    Remove the egg and transfer to a bowl of cold water. Leave to cool completely (change the water once or twice if it starts to warm up). Peel the egg and, if you have time, marinade it in the soy sauce and mirin for an hour (optional).
    
    Blanch the greens in boiling water until hot through and just tender. Prepare the instant ramen according to the pack instructions. Halve the egg.
    
    Garnish the ramen with the fat (if using), egg, greens, pickles, meat and spring onion.',	15),
    (169,	'Chocolate hazelnut cake',	'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chocolate_and_hazelnut_38207_16x9.jpg',	10,	60,	'https://www.bbc.co.uk/food/recipes/chocolate_and_hazelnut_38207',	'Preheat the oven to 200C/400F/Gas 6.
    
    Put the hazelnuts on a baking tray and roast them in the centre of the oven for 10 minutes, giving the pan a shake halfway through, until they are golden brown. Watch them carefully so that they don’t burn. Remove and leave them to cool for a few minutes.
    
    Reduce the oven temperature to 180C/350F/Gas 4.Butter a 23cm/9in springform cake tin and line the base with baking parchment.
    
    Place 200g/7oz of the hazelnuts in a food processor and blend them until they are fairly finely ground. If you blend the nuts to the consistency of fine breadcrumbs, they should work a treat, but leave a few coarser pieces to add texture. Set the remaining 50g/2oz hazelnuts aside.
    
    Put the butter and chocolate in a heatproof bowl and set it above a pan of gently simmering water. Stir occasionally and as soon as nearly all the chocolate has melted, remove the bowl from the pan and continue to let the chocolate melt in the residual heat.
    
    Stir in the ground hazelnuts and leave the mixture to cool for 5 minutes.
    
    Beat the egg yolks and sugar together with an electric hand-whisk for at least 5 minutes until pale and creamy, then stir into the chocolate mixture until thoroughly combined. Wash and dry the beaters well
    
    In a clean bowl, whisk the egg whites until stiff peaks form – they are ready when you can turn the bowl upside down without the eggs sliding out. Do not over whisk.
    
    Working quickly, stir the hazelnut liqueur, amaretto or orange juice, into the chocolate mixture to soften. Add a couple of tablespoonfuls of the whisked egg whites and stir until thoroughly combined, then gently fold in the remaining egg whites.
    
    Spoon the mixture into the prepared tin and bake in the centre of the oven for 35–40 minutes or until the cake is well risen and firm.
    
    Remove the cake from the oven and leave it to cool in the tin for 30 minutes. Undo the springclip and invert the cake on to a serving plate, then peel off the lining paper and leave it to cool completely.
    
    When the cake is cold, spread it with the chocolate and hazelnut spread and sprinkle with the hazelnuts that you set aside – these can be whole or chopped, whatever you prefer.',	27),
    (170,	'Apple elderflower cooler',	'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/apple_elderflower_cooler_90545_16x9.jpg',	2,	25,	'https://www.bbc.co.uk/food/recipes/apple_elderflower_cooler_90545',	'Pour the lemon juice, elderflower cordial and apple juice into a cocktail shaker full of ice. Shake for 10 seconds, then pour everything (including the ice) into a half-pint glass or tumbler. (Alternatively, you can stir it all together in a large glass.)
    
    Top up the drink, to taste, with sparkling water, if using. Add a sprig of mint to garnish.',	27),
    (171,	'Blood orange tart',	'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/bloodorangetart_93766_16x9.jpg',	8,	120,	'https://www.bbc.co.uk/food/recipes/bloodorangetart_93766',	'Whisk the sugar, orange juice and zest, orange blossom water, eggs and egg yolks together in a bowl until well combined.
    
    Add the butter and set over a pan over simmering water. (Do not let the base of the bowl touch the water.)
    
    Cook for 15-20 minutes, stirring regularly, until the butter has melted and the mixture has thickened.
    
    Pour the mixture into the cooked pastry case, cover with clingfilm (to prevent a skin forming) and set aside to cool.
    
    Arrange the orange slices on the cooled tart and sprinkle over the demerara sugar.
    
    Using a cooks'' blowtorch, heat the sugar until caramelised.
    
    To serve, slice the tart and serve with double cream or custard.',	27);`);

    await queryRunner.query(`INSERT INTO "ingredients" ("id", "productId", "unitId", "quantity") VALUES
    (158,	198,	16,	1),
    (159,	720,	10,	1),
    (160,	105,	16,	4),
    (161,	1177,	9,	0.25),
    (162,	399,	160,	3),
    (163,	1679,	14,	1),
    (164,	181,	14,	1),
    (165,	1132,	10,	1),
    (168,	1679,	14,	1),
    (169,	231,	133,	1),
    (170,	1005,	9,	0.50),
    (171,	215,	43,	1),
    (172,	181,	14,	1),
    (173,	1389,	10,	1),
    (174,	1381,	10,	3),
    (175,	818,	1,	1),
    (176,	1003,	9,	1),
    (177,	218,	9,	0.25),
    (178,	651,	14,	2),
    (179,	12,	35,	4),
    (180,	877,	298,	4),
    (181,	181,	10,	0.20),
    (182,	1398,	10,	3),
    (183,	1634,	10,	1),
    (184,	1679,	10,	0.20),
    (185,	99,	9,	2),
    (186,	501,	9,	2.50),
    (187,	492,	10,	1),
    (188,	160,	10,	1),
    (190,	1686,	9,	0.50),
    (189,	996,	10,	0.50),
    (191,	1231,	10,	1),
    (192,	1132,	124,	2),
    (193,	159,	9,	0.75),
    (194,	399,	15,	2),
    (195,	1177,	9,	1),
    (196,	1686,	9,	0.50),
    (197,	1918,	14,	1),
    (198,	1106,	131,	1),
    (199,	1981,	18,	1),
    (200,	720,	9,	1),
    (201,	996,	26,	1),
    (202,	606,	27,	1),
    (203,	501,	4,	135),
    (204,	1132,	10,	2),
    (205,	1686,	10,	2),
    (206,	1679,	10,	0.50),
    (207,	160,	10,	1),
    (208,	1177,	248,	135),
    (209,	399,	15,	1),
    (210,	1460,	16,	4),
    (211,	1748,	10,	2),
    (212,	1496,	10,	0.50),
    (213,	1589,	225,	1),
    (214,	1372,	18,	1),
    (215,	604,	18,	1),
    (216,	1914,	10,	1),
    (217,	399,	18,	1),
    (218,	1132,	4,	200),
    (219,	1686,	4,	200),
    (220,	708,	4,	250),
    (221,	359,	4,	200),
    (222,	399,	18,	6),
    (223,	35,	248,	125),
    (224,	2004,	18,	1),
    (225,	426,	10,	1),
    (226,	1116,	98,	0.50),
    (227,	1178,	18,	1),
    (228,	1413,	10,	1),
    (229,	1686,	4,	200),
    (230,	1132,	4,	200),
    (231,	1443,	98,	3),
    (232,	1529,	225,	1),
    (233,	399,	18,	2);`);

    await queryRunner.query(`INSERT INTO "recipes_ingredients_ingredients" VALUES
    (160,	158),
    (160,	160),
    (160,	159),
    (160,	163),
    (160,	162),
    (160,	161),
    (160,	164),
    (160,	165),
    (163,	169),
    (163,	170),
    (163,	168),
    (163,	171),
    (163,	172),
    (163,	173),
    (164,	179),
    (164,	177),
    (164,	181),
    (164,	175),
    (164,	176),
    (164,	174),
    (164,	180),
    (164,	178),
    (164,	182),
    (164,	183),
    (164,	184),
    (165,	185),
    (165,	187),
    (165,	188),
    (165,	190),
    (165,	186),
    (165,	191),
    (165,	189),
    (165,	193),
    (165,	192),
    (165,	194),
    (166,	197),
    (166,	195),
    (166,	198),
    (166,	202),
    (166,	196),
    (166,	199),
    (166,	201),
    (166,	200),
    (167,	204),
    (167,	203),
    (167,	206),
    (167,	205),
    (167,	207),
    (167,	208),
    (167,	209),
    (168,	210),
    (168,	213),
    (168,	212),
    (168,	214),
    (168,	211),
    (168,	216),
    (168,	215),
    (168,	217),
    (169,	218),
    (169,	220),
    (169,	219),
    (169,	222),
    (169,	221),
    (170,	223),
    (170,	224),
    (170,	226),
    (170,	225),
    (170,	227),
    (171,	229),
    (171,	228),
    (171,	230),
    (171,	233),
    (171,	231),
    (171,	232);`);

    await queryRunner.query(`INSERT INTO "recipes_mealtypes_mealtypes" VALUES
    (160,	7),
    (163,	1),
    (164,	1),
    (165,	3),
    (166,	3),
    (167,	7),
    (168,	1),
    (168,	8),
    (169,	3),
    (170,	14),
    (171,	3);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "recipes_mealtypes_mealtypes"`);
    await queryRunner.query(`TRUNCATE "recipes_ingredients_ingredients"`);
    await queryRunner.query(`TRUNCATE "ingredients"`);
    await queryRunner.query(`TRUNCATE "recipes"`);
  }
}
