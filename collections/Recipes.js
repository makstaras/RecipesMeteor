Recipes = new Mongo.Collection('recipes');

Recipes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});

Ingredient = new SimpleSchema({
	name: {
		type: String
	},
	amount: {
		type: String
	}
});


RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	desc:{
		type: String,
		label: "Description"
	},
	ingredients: {
		type: [Ingredient]
	},
	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	author:{
		type: String,
		label: "Author",
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	createAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}
});

Meteor.methods({ //зміна inMenu з false на true, щоб записати рецепт в меню
	toggleMenuItem: function(id, currentState){
		Recipes.update(id, {
			$set: {
				inMenu: !currentState //зміна на протилежне значення
			}
		});
	},
	deleteRecipe: function(id) {
		Recipes.remove(id);
	}
});

Recipes.attachSchema( RecipeSchema );