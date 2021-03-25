function validateForm() {
  
    

    if (document.forms.recipeForm.nameInput.value === ""){
        alert("Pleaes enter a name for a recipe...");
        return false;
    }
    if (document.forms.recipeForm.tagInput.value === ""){
        alert("Please enter some tags for the recipe...");
        return false;
    }
    if (document.forms.recipeForm.ingredientsInput.value === ""){
        alert("Please enter a value for the recipes needed");
        return false;
    }
    if (document.forms.recipeForm.directionsInput.value === ""){
        alert("Please enter a set of directions for the recipe...");
        return false;
    }
    if (document.forms.recipeForm.originInput.value === ""){
        alert("Please enter the origin of the recipe...");
        return false;
    }
    if (document.forms.recipeForm.inputView.value === "Choose..."){
        alert("Please select the privellege that you would like the recipe to be on...");
        return false;
    }







    return true;
}