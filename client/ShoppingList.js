Meteor.subscribe('recipes');

/*Template.Recipes.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subcribe('recipes');
	});
});*/

Template.ShoppingList.helpers({
	shoppingList: ()=> {
		return Recipes.find({inMenu: true});
	}
});