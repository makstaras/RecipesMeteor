Template.Recipe.onCreated(function() {
	this.editMode = new ReactiveVar(false); //реактивна змінна для відкриття форми редагування для окремого рецепту
});

Template.Recipe.helpers({
	updateRecipeId: function() { //updateRecipeId - хелпер індивідуального виводу дляредагування рецепту
		return this._id;   //повернення для цього id окремого рецепту
	},
	editMode: function(){
		return Template.instance().editMode.get();
	}
});

Template.Recipe.events({
	'click .toggle-menu' : function(){
		Meteor.call('toggleMenuItem', this._id, this.inMenu);
	},
	'click .fa-trash' : function() {
		Meteor.call('deleteRecipe', this._id);
	},
	'click .fa-pencil' : function(event, template) { 
		//Session.set('editMode', !Session.get('editMode')); //при натисканні на олівець відкриття форми редагування
		template.editMode.set(!template.editMode.get());  //відкриття форми тільки для окремого рецепту
	}
});