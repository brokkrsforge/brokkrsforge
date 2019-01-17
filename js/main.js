$("#itemType, #itemAttunement, #itemRarity").prop("selectedIndex", -1);

let itemName ="Name", itemType ="Type", itemSlot ="Slot", itemAttunement ="(requires attunement)", itemRarity ="Rarity", itemValue ="Value", itemDescription ="Description";

  $('#color').val('#454545');
  $('#titleColor').val('#FFFFFF');

$('#color').on('input', function() {    
  $('#card').css('background', $('#color').val());
});

$('#titleColor').on('input', function() {    
  $('#title').css('color', $('#titleColor').val());
});

$('#itemName').on('input', function() {
  itemName = $("#itemName").val();    
  $('#title').text(itemName);
});

$('#itemType').on('input', function() {
  itemType = $("#itemType option:selected").text();  
  $('#typeSlotAttune').text(itemType+' '+itemAttunement);
  //$('.cardIcon').attr('data',`images/icons/SVG/${itemType}.svg`); //swaps icon for each item type
  if(itemType=='Wondrous Item'){$('#card use').attr('xlink:href', `#iconWondrous`);}
  else{$('#card use').attr('xlink:href', `#icon${itemType}`);} //swaps icon for each item type

  //$(`#card${cardList.indexOf(activeCard)} use`).attr('xlink:href', `#icon${currentCard._type}`);

});

$('#itemAttunement').on('input', function() {
  itemAttunement = ($("#itemAttunement").is(":checked")) ? '(Requires attunement)' : '';
  $('#typeSlotAttune').text(itemType+' '+itemAttunement);
});

$('#itemRarity').on('input', function() {
  itemRarity = $("#itemRarity option:selected").text();    
  if (itemValue==''){
    $('#rarityValue').text(itemRarity);
  }
  else{
   $('#rarityValue').text(itemRarity+', '+itemValue);
  }
});

$('#itemValue').on('input', function() {
  itemValue = $("#itemValue").val();
  if (itemValue==''){
    $('#rarityValue').text(itemRarity);
  }
  else{
   $('#rarityValue').text(itemRarity+', '+itemValue);
  }
});

$('#itemDescription').on('input', function() {
    var itemDescription = $('#itemDescription').val();  
    fontAdjust(itemDescription.length);
    $('#description').text(itemDescription);
});


//Adjusts font size to fit description area
  //needs tweaking/reworking
let fontAdjust = function(length){
  if (length>990){
    $('#description').css('font-size','8px');
  }
  else if (length>760){
    $('#description').css('font-size','9px');
  }
  else if (length>680){
    $('#description').css('font-size','10px');
  }
  else if (length >560){
    $('#description').css('font-size','11px');
  }
  else{
    $('#description').css('font-size','12px');
  }
}


class Card {
  constructor(name, type, attunement, rarity, value, description, backColor, titleColor) {
    this._name = name;
    this._type = type;
    this._attunement = attunement;
    this._rarity = rarity;
    this._value = value;
    this._description = description;
    this._backColor = backColor;
    this._titleColor = titleColor;
  }
}

//First card is initialized. An array is created to handle the deck. The first card is added to the deck
let card0 = new Card('Item Name', "", true, "", "", "", '#454545', '#FFFFFF');
let cardList=[];
let cardCount;
cardList.push(card0);
$('#cardList').append(`<li class='cardItem' id='card0'><span>${card0._name}</span><svg class='cardListIcon' onclick="deckDelete($(this).parent()[0].id);"><use xlink:href=""></use></svg></li>`)
//TASK:
//create function that pushes new cards to the proper array and updates UI accordingly
  //cardCount
  //Position in Library or Deck

//sets the active card for the UI to interact with
let activeCard=cardList[0];


//Clears all inputs and card fields
let clearCard = function(currentCard){
  //Updates form fields to reflect data from the active card(activeCard)
  $("#itemName").val(currentCard._name);
  $('#itemType').val(currentCard._type);
  $("#itemAttunement").prop( "checked", currentCard._attunement ); 
  $('#itemRarity').val(currentCard._rarity);
  $("#itemValue").val(currentCard._value);
  $('#itemDescription').val(currentCard._description); 
  $('#color').val(currentCard._backColor);
  $('#titleColor').val(currentCard._titleColor);

//Updates variables to match values of the active card
itemName = $("#itemName").val();  
itemType = $("#itemType option:selected").text();
itemAttunement = ($("#itemAttunement").is(":checked")) ? '(Requires attunement)' : '';
itemRarity = $("#itemRarity option:selected").text();   
itemValue = $("#itemValue").val();
itemDescription = $('#itemDescription').val();


//Updates card UI to reflect data of the active card(activeCard)
  $('#title').text(itemName);
  $('#typeSlotAttune').text(itemType+' '+itemAttunement);    
    switch(itemType){
      case 'Weapon':
        $('#icon').css('background', 'url("https://png.icons8.com/ios/52/e74c3c/sword-filled.png")');
        break;
      default:
        $('#icon').css('background', '');
    }
      if (itemValue==''){
        $('#rarityValue').text(itemRarity);
      }
      else{
        $('#rarityValue').text(itemRarity+', '+itemValue);
      }
    fontAdjust(itemDescription.length);
    $('#description').text(itemDescription);
    $('#card').css('background', $('#color').val());
    $('#title').css('color', $('#titleColor').val());
    if(itemType==""){
      $('#card use').attr('xlink:href', '');
    }
    else if(itemType=='Wondrous Item'){
      $('#card use').attr('xlink:href', `#iconWondrous`);
    }
    else{
      //$('.cardIcon').attr('data',`images/icons/SVG/${itemType}.svg`);
      $('#card use').attr('xlink:href', `#icon${itemType}`);
    }
}

//Saves the new user data for the activeCard and overwrites the values saved to that card in the array
let saveCard = function(currentCard){
  currentCard._name=$("#itemName").val();
  currentCard._type=$("#itemType option:selected").val(); 
  currentCard._attunement=$("#itemAttunement").is(":checked");  
  currentCard._rarity=$("#itemRarity option:selected").val();
  currentCard._value=$("#itemValue").val();
  currentCard._description=$('#itemDescription').val(); 
  currentCard._backColor=$('#color').val();
  currentCard._titleColor=$('#titleColor').val();
  //Updates UI of card in the deck UI to reflect new user data
  $(`#card${cardList.indexOf(activeCard)} span`).text(currentCard._name);
  $(`#card${cardList.indexOf(activeCard)}`).css('background', currentCard._backColor);
  $(`#card${cardList.indexOf(activeCard)}`).css('color', currentCard._titleColor);
  if (currentCard._type==""){

  }
  else{
    $(`#card${cardList.indexOf(activeCard)} use`).attr('xlink:href', `#icon${currentCard._type}`);
  }
}
//Adds a new card to the array(cardList[]). Adds the html elements for new card to the deck UI
let addNewCard = function(){
  let cardNum=cardList.length;
  let cardID = 'card'+cardNum;
  cardList.push();
  cardList[cardNum]=new Card('New Item', "", false, "", "", "", '#454545', '#FFFFFF');
  cardList[cardNum]._name='New Item';
  $('#cardList').append(`<li class='cardItem' id='${cardID}'><div class="InsertButtonName"></div><span>${cardList[cardNum]._name}</span><svg class='cardListIcon' onclick="event.stopPropagation();deckDelete($(this).parent()[0].id);"><use xlink:href="#icon${cardList[cardNum]._type}"></use></svg></li>`)//images/icons/SVG/${cardList[cardNum]._type}.svg

  //changes the active card to the newly created card
  activeCard=cardList[cardNum];
  //Updates UI to match the new card
  clearCard(activeCard);
}

//create deck array and change cardList to library
let library = [];
//add card to deck from library
$("#cardList").on("click", '.InsertButtonName', function(){
  let ID = this.parentElement.id;
  let IDNum = ID.slice(4);
  let cardNum=library.length;
  let cardID = 'card'+cardNum;
  library.push(cardList[IDNum]);

  $('#deckList').append(`<li class='cardItem' id='${cardID}'><div class="InsertButtonName"></div><span>${library[cardNum]._name}</span><svg class='cardListIcon' onclick="event.stopPropagation();deckDelete($(this).parent()[0].id);"><use xlink:href="#icon${library[cardNum]._type}"></use></svg></li>`)
    //need to add code similar to the below on-click function to update UI
    //need to add separate delete button from library cards
    //need to change library to 'deck' and cardList to 'library'
    //need to add a new id system for the cards in library so they do not conflict with the original deck.

    //
  //$(`#card${cardList.indexOf(activeCard)}`).css('background', currentCard._backColor);
  //$(`#card${cardList.indexOf(activeCard)}`).css('color', currentCard._titleColor);

});

//changes the active card(activeCard) to the card that is clicked
$("#cardList").on("click", '.cardItem', function(){
  let ID = this.id;
  let IDNum = ID.slice(4);
  activeCard=cardList[IDNum];
  clearCard(activeCard);
  cardEnabled();
});

$("#deckList").on("click", '.cardItem', function(){
  let ID = this.id;
  let IDNum = ID.slice(4);
  activeCard=library[IDNum];
  clearCard(activeCard);
  cardEnabled();

});


//Prints all cards
let printCards = function(){
  for (let i=0; i<cardList.length;i++){
    let rarityValue;
    if (cardList[i]._value==''){
      rarityValue = cardList[i]._rarity;
    }
    else{
      rarityValue = cardList[i]._rarity+', '+cardList[i]._value;
    }

    let attunementValue;
    if (cardList[i]._attunement){
      attunementValue = " (Requires Attunement)";
    }
    else{
      attunementValue = "";
    }

    $('#printWindow').append(`
      <div class='card' style='background: ${cardList[i]._backColor}'>
        <svg class='cardIcon' onmouseover="morphExit()"><use xlink:href="#icon${cardList[i]._type}"></use></svg>

        <h1 class='title cardContent' style='color: ${cardList[i]._titleColor}'>${cardList[i]._name}</h1>
        <div class='contentBox'>
          <h1 class='typeSlotAttune cardContent'>${cardList[i]._type} ${attunementValue}</h1>
          <h1 class='rarityValue cardContent'>${rarityValue}</h1>
          <p class='description cardContent'>${cardList[i]._description}</p>
        </div>
      </div>
    `);
  }

    window.print();
    $('#printWindow').empty();
  
}

//Deletes cards
//can probably just add a second perameter to make this work for both the cardList and library arrays
let deckDelete = function(cardIndex){
  let activeIndex = cardList.indexOf(activeCard);
  cardIndex=cardIndex.substring(4);

  cardList.splice(cardIndex,1);
  if (cardIndex==activeIndex){
    if (cardIndex!=0){
      activeCard=cardList[cardIndex-1];
      clearCard(activeCard);
    }
    else{
      activeCard=cardList[cardIndex];
      clearCard(activeCard);
    }
  }
  
  $(`#card${cardIndex}`).remove();
  for(let i=cardIndex;i<cardList.length+1;i++){
    $(`#card${i}`).attr("id",`card${i-1}`);
  }
  if(cardList.length==0){
    //hide card
  }
}

let detailsDelete = function(){
  let cardIndex = cardList.indexOf(activeCard);
  cardIndex=cardIndex.substring(4);

  cardList.splice(cardIndex,1);
    if (cardIndex!=0){
      activeCard=cardList[cardIndex-1];
      clearCard(activeCard);
    }
    else{
      activeCard=cardList[cardIndex];
      clearCard(activeCard);
    }
  
  $(`#card${cardIndex}`).remove();
  for(let i=cardIndex;i<cardList.length+1;i++){
    $(`#card${i}`).attr("id",`card${i-1}`);
  }
}


//Duplicates card
let dupeCard = function(){
  let originalCard=activeCard;
  let originalIndex = cardList.indexOf(originalCard);
  console.log('originalIndex: '+originalIndex);
  //originalIndex=originalIndex.substring(4);
  
  console.log('cardList length: '+cardList.length);
  let dupedCard=new Card(activeCard._name, activeCard._type, activeCard._attunement, activeCard._rarity, activeCard._value, activeCard._description, activeCard._backColor, activeCard._titleColor);
  cardList.push(dupedCard);
  $('#cardList').append(`<li class='cardItem' id='card${cardList.length-1}'><span>${cardList[cardList.length-1]._name}</span><svg class='cardListIcon' onclick="event.stopPropagation();deckDelete($(this).parent()[0].id);"><use xlink:href="#icon${cardList[cardList.length-1]._type}"></use></svg></li>`)//images/icons/SVG/${cardList[cardNum]._type}.svg
  $(`#card${cardList.length-1}`).css('background', cardList[cardList.length-1]._backColor);
  $(`#card${cardList.length-1}`).css('color', cardList[cardList.length-1]._titleColor);
}

//adds focus to the UI of the active card in the card list 
let cardEnabled = function(){
  let enabledCard = cardList.indexOf(activeCard);
  $('.cardItem').removeClass('cardEnabled');
  $(`#card${enabledCard}`).addClass('cardEnabled');
}

//hides the options pane
let hideOptions = function(){
  $('#options').toggleClass('optionsHide');
}

//******TO DO:******//

//COMPLETED:
  //change card dimensions to 3.5in x 2.5in for printing. adjust rest of elements to fit.
  //Add icons
  //Decide on 'slot' - Removed
  //Add single card print support
  //Add multi-card print support
  //fix printed value of attunement
  //temp fix for wondrous icon
  //Add ui and code to remove card from array. 
    //UI:hovering on the right side of title bar will reveal an 'X' that deletes that card on click
  //Add functionality to remove cards from deck
    //add functionality to duplicate cards

//ONGOING:

  //add code from spell card app to list created cards on pane on right side
    //add search functionality
    //add sort functionality, sort by item type
  //add card back with matching icon from type, with matching color from front background around the edges
    //add css transform to rotate card
  //Add some sort of saving functionality
    //save to browser/cookies vs account based
  //Pretty up UI
    //hover effects
    //reposition buttons
    //overflow for card list
    //search bar
  //Add mobile functionality
  //include bonus features for patreon supporters
  //Update cards on save button press vs on input update/change of focus
  //Clean up code
  //add patreon link

  //Build Overall site