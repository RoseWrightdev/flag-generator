//nav
let navCounter = null;
function closeMenu(){
    let menu = document.getElementById('nav');
    menu.style.left = '-100vw';

    navCounter++;
    console.log('navCounter = ' + navCounter);
    if(navCounter % 2 == 0){
        return console.log('Nav is already closed')
    }
}
function openMenu(){
    let menu = document.getElementById('nav');
    menu.style.left = '0%';

    navCounter++;
    console.log('navCounter = ' + navCounter);
    if(navCounter % 2 !== 0){
        return console.log('Nav is already open')
    }
} 

//stripe height
let stripeHeight = 100;

//clearing function
let updateCount = 0;
function update(){
    updateCount++;
if(updateCount > 0){
    document.getElementById('colorOption').innerHTML = '';
    document.getElementById('flag').innerHTML = '';
    document.getElementById('borderReset').innerHTML = '';
    document.getElementById('borderReset').innerHTML = '<p>Show Stripe Highlights</p><label class="switch"><input type="checkbox" id="borderCheck" checked onclick="outlinecheckBox()"><span class="slider round"></span></label>';
    document.getElementById('numbersReset').innerHTML = '';
    document.getElementById('numbersReset').innerHTML = '<p>Number Stripes</p><label class="switch"><input type="checkbox" id="numbersCheck" checked onclick="numbercheckbox()"><span class="slider round"></span></label>';
    document.getElementById('hexReset').innerHTML = '';
    document.getElementById('hexReset').innerHTML = '<p>Show RGB value</p><label class="switch"><input type="checkbox" id="showHex" checked onclick="showHex()"><span class="slider round"></span></label>';
}

//Get number of stripes inputed and set default value if no input is given.
function stripeFunc(){
    let stripeNum = document.getElementById('stripe-number').value;
    if(stripeNum >= 1 && stripeNum <= 12){
        ////console.log(stripeNum + '\nif stripeNum active');
        return stripeNum;
    }
    else{
        let stripeNum = 3;
        ////console.log(stripeNum + '\n\nelse stripeNum active');
        return stripeNum;
    }
}
let stripeVal = stripeFunc();
////console.log(stripeVal + "\n\nStripe Value Function Test");


//create stripes inputed
let counter = 1;
for(counter = 1; counter <= stripeVal; counter++){
    function createStripe(){
        //creates stripes
        const stripe = document.createElement('div');
        //adds numbered classes
        stripe.classList.add('stripe' + counter);
        //adds numbered ids
        stripe.setAttribute('id','stripe' + counter);
        //sets height relative to number of stripes
        stripe.style.height = stripeHeight / stripeVal + 'vh';
        //aligns text
        stripe.style.textAlign = 'right'; 
        //text padding
        stripe.style.paddingRight = '0.5vw';
        //font family
        stripe.style.fontFamily = 'monospace';
        //adds areStripeNumbersEnabled function

        //adds close function
        stripe.setAttribute('onclick','closeMenu()');



        ////console test
        ////console.log('stripe' + counter + '\n\nCreateStripe Function Test');
        //poisitions in dom
        const stripeDom = document.getElementById('flag');
        stripeDom.appendChild(stripe);
    }
    createStripe()

//create color options for stripes
    function createColorOption(){
        //step 1. creates inputs
        const colorInput = document.createElement('input');
        //adds numbered classes to the inputs
        //colorInput.classList.add('color-option' + counter);   
        //adds numbered ids to the inputs
        colorInput.setAttribute('id','color-option-' + counter);
        //sets input tpye
        colorInput.setAttribute('type','color');     
        //positions inputs in dom
        const colorOption = document.getElementById("colorOption");
        colorOption.appendChild(colorInput)

        //step 2. creates input lables
        const colorInputLable = document.createElement('lable');       
        //sets lable id
        let colorInputLableId = 'colorLableId' + counter;
        colorInputLable.setAttribute('id', 'colorLableId' + counter)
        //sets lable for input
        let colorInputId = 'color-option-' + counter;
        colorInputLable.setAttribute('for', colorInputId);    
        //positions lables in dom
        colorOption.appendChild(colorInputLable)
        //array for number preface text
        const words = ['First', 'Seccond', 'Thrid', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
        if(counter > 10){
            let preface = counter + 'th'
            //sets lable text
            let lableTaxt = document.getElementById(colorInputLableId).innerHTML = preface + ' stripe color';  
        }
        else{
        let preface = words[counter - 1];
        //sets lable text
        let lableTaxt = document.getElementById(colorInputLableId).innerHTML = preface + ' stripe color';  
        }
        //////console.log(lableTaxt)
    }
    createColorOption()
}
}
update()

//color selection
function colorSelection(){
    //setup
    let parent = document.getElementById('flag');
    let elementCount = parent.childElementCount;
    ////console.log(elementCount + 'childElementCount')
    //loop
    for(let colorCounter = 1; colorCounter <= elementCount; colorCounter++){
        ////console.log(colorCounter + ' colorCounter')
        let color = document.getElementById('color-option-' + colorCounter).value
        let stripeColor = document.getElementById('stripe' + colorCounter)
        stripeColor.style.background = color
        }
}

//random color defaults
function colorDefaults(){
    //stripe counter
    let parentcolorDefaults = document.getElementById('flag');
    let elementCountcolorDefaults = parentcolorDefaults.childElementCount;

    //random color gen
    function randomColor(){
    let colorRandom = (Math.random() * 0xffffff * 1000000).toString(16);
    return '#' + colorRandom.slice(0, 6);
    }
    let colorRandom = randomColor()

    //Color Tint/Shadeer
    function tintShade(color, amount){
       let usePound = false;
       if(color[0] == '#'){
           color = color.slice(1);
           usePound = true;
       }
       let num = parseInt(color, 16);

       let r = (num >> 16) + amount;

       if (r > 255) r = 255;
       else if ( r < 0) r = 0;

       let b = ((num >> 8) & 0x00FF) + amount;

       if (b > 255) b = 255;
       else if (b < 0) b = 0;

       let g = (num & 0x0000FF) + amount;

       if (g > 255) g = 255;
       else if (g < 0) g = 0;

       return (usePound?'#':'') + (g | (b << 8) | (r << 16)).toString(16);
    }

    //tint or shade increment
    let increment = 20;
    //tint or shade randomizer
    let tintorShade = Math.floor(Math.random() * 2) + 1;
    if (tintorShade == 1){
        increment *= -1;
    }
    else{
        increment = 20;
        }
        
    //loop
    for(let colorCounter = 1; colorCounter <= elementCountcolorDefaults; colorCounter++ ){
            // increases increment on each loop
            increment += colorCounter * 1.5
            // selects color
            let stripeColor = document.getElementById('stripe' + colorCounter)
            // sets color
            stripeColor.style.background = tintShade(colorRandom, increment)            
            
    }
       
}
colorDefaults()

//checks for borders
function outlinecheckBox(){
    //element counter
    let borderParents = document.getElementById('flag');
    let elementCountBorder = borderParents.childElementCount;
    //converts checkbox to boonlean value
    let borderCheck = document.querySelector('#borderCheck:checked') !== null;
    //console.log(borderCheck)
    if(borderCheck){           
            for(let borderCounter = 1; borderCounter <= elementCountBorder; borderCounter++ ){
                // selects border
                let border = document.getElementById('stripe' + borderCounter)
                // sets border
                border.style.border = 'none'            
        }
    }
    else{
            for(let borderCounter = 1; borderCounter <= elementCountBorder; borderCounter++ ){
                // selects border
                let border = document.getElementById('stripe' + borderCounter)
                // sets border
                border.style.border = 'solid black 0.5vh'
        }
    }
}
outlinecheckBox()

//checks for borders
function numbercheckbox(){
    //element counter
    let parents = document.getElementById('flag');
    let elementCount = parents.childElementCount;
    //converts checkbox to boonlean value
    let check = document.querySelector('#numbersCheck:checked') !== null;
    //console.log(check)
    if(check){
            
            for(let counter = 1; counter <= elementCount; counter++ ){
                // selects
                let i = document.getElementById('stripe' + counter)
                // sets
                i.innerHTML = ""            
        }
    }
    else{
            for(let counter = 1; counter <= elementCount; counter++ ){

                document.getElementById('hexReset').innerHTML = '';
                document.getElementById('hexReset').innerHTML = '<p>Show RGB value</p><label class="switch"><input type="checkbox" id="showHex" checked onclick="showHex()"><span class="slider round"></span></label>';
            
                // selects
                let i = document.getElementById('stripe' + counter)
                // sets
                i.innerHTML = "" + counter;
        }
    }
}
numbercheckbox()

function showHex(){
    //element counter
    let parents = document.getElementById('flag');
    let elementCount = parents.childElementCount;
    //converts checkbox to boonlean value
    let check = document.querySelector('#showHex:checked') !== null;
    if(check){
            
            for(let counter = 1; counter <= elementCount; counter++ ){
                // selects
                let i = document.getElementById('stripe' + counter)
                // sets
                i.innerHTML = ""                 
        }
    }
    else{
            for(let counter = 1; counter <= elementCount; counter++ ){

                
                document.getElementById('numbersReset').innerHTML = '';
                document.getElementById('numbersReset').innerHTML = '<p>Number Stripes</p><label class="switch"><input type="checkbox" id="numbersCheck" checked onclick="numbercheckbox()"><span class="slider round"></span></label>';
                  
                // selects
                let i = document.getElementById('stripe' + counter)
                const style = getComputedStyle(i)

                const backgroundColor = style.backgroundColor
                console.log(backgroundColor) // rgb(0, 0, 0)
                // sets
                i.innerHTML = backgroundColor        
        }
    }
}


function numbercheckboxClear() {
    document.getElementById('numbersReset').innerHTML = '';
    document.getElementById('numbersReset').innerHTML = '<p>Number Stripes</p><label class="switch"><input type="checkbox" id="numbersCheck" checked onclick="numbercheckbox()"><span class="slider round"></span></label>';
}