// keeping the calculator in the middle of the page
function centerElement() {
    var calculator = document.getElementById("Calculator");
    var body = document.getElementsByTagName("Body")[0];
    var x2 = calculator.offsetWidth;
    var x1 = body.offsetWidth;
    var y2 = calculator.offsetHeight;
    var y1 = body.offsetHeight;
    var marginX = (x1-x2) / 2;
    var marginY = (y2-y1) / 2;
    calculator.style.top = marginY + "px";
    calculator.style.left = marginX + "px";
}

window.onclick = centerElement;

window.onkeydown = centerElement;

window.onresize = centerElement;

window.onload = function () {

    centerElement();

    var storedNum = 0;
    var storedOp = "";

    var num = document.getElementsByClassName("Num");
    var op = document.getElementsByClassName("Op");
    var past = document.getElementById("past");
    var current = document.getElementById("current");

    // lets clicking on the numbers add to the display
    for (let i = 0; i < num.length; i++) {
        num[i].addEventListener("click", () => display(num[i].innerText))
    }

    // lets clicking on the operators do their functions / store them
    for (let i = 0; i < op.length; i++) {
        op[i].addEventListener("click", () => {
            switch (op[i].id) {
                case "Clear": clear(); break;
                case "Negative": negativeOp(); break;
                case "Percent": operatorDoes("%"); break;
                case "Divide": operatorDoes("/"); break;
                case "Multiply": operatorDoes("*"); break;
                case "Subtract": operatorDoes("-"); break;
                case "Add": operatorDoes("+"); break;
                case "Equals": operatorDoes("="); break;
            }
        })
    }

    // pushing buttons affect display
    document.addEventListener("keydown", (event) => {
        // console.log(event.key);
        switch (event.key) {
            case "Backspace": clear(); break;
            case "Escape": clear(); break;
            case "1": display(1); break;
            case "2": display(2); break;
            case "3": display(3); break;
            case "4": display(4); break;
            case "5": display(5); break;
            case "6": display(6); break;
            case "7": display(7); break;
            case "8": display(8); break;
            case "9": display(9); break;
            case "0": display(0); break;
            case ".": display("."); break;
            case "%": operatorDoes("%"); break;
            case "=": operatorDoes("="); break;
            case "/": operatorDoes("/"); break;
            case "*": operatorDoes("*"); break;
            case "+": operatorDoes("+"); break;
            case "-": operatorDoes("-"); break;
            case "Enter": operatorDoes("="); break;
        }
    })
    // DEBUG: changed all parseInt to parseFloat so it accepts the "." value
    // collects all inputs and collects what operation the user wants
    function operatorDoes(operator) {
        switch (operator) {
            case "%":
                // divides the current display by 100 first then evaluates
                current.innerText = (parseFloat(current.innerText) / 100) * storedNum; // how actual windows/mac calculator works
                // past code: just "%" dividing current text by 100
                // current.innerText = (parseFloat(current.innerText) / 100) * storedNum;
                // evaluate();
                // past.innerText = "";
                // current.innerText = storedNum;
                // storedNum = 0;
                // storedOp = "";
                break;
            case "=":
                evaluate();
                past.innerText = "";
                current.innerText = storedNum;
                storedNum = 0;
                storedOp = "";
                break;
            case "/":
                evaluate();
                past.innerText += ' \u00f7';
                storedOp = "/";
                break;
            case "*":
                evaluate();
                past.innerText += ' \u00d7';
                storedOp = "*";
                break;
            case "+":
                evaluate();
                past.innerText += ' +';
                storedOp = "+";
                break;
            case "-":
                evaluate();
                past.innerText += ' -';
                storedOp = "-";
                break;
        }
        select(operator);
    }
    // does the equations
    function evaluate() {
        var parsed = parseFloat(current.innerText);
        switch (storedOp) {
            case "/":
                storedNum /= parsed;
                past.innerText = storedNum;
                break;
            case "*":
                storedNum *= parsed;
                past.innerText = storedNum;
                break;
            case "-":
                storedNum -= parsed;
                past.innerText = storedNum;
                break;
            case "+":
                storedNum += parsed;
                past.innerText = storedNum;
                break;
            default:
                storedNum = parsed;
                past.innerText = storedNum;
                break;
        }
        current.innerText = "0";
        if(negative.classList.contains("activated")){ negativeOp() } // DEBUG: this is to disable the +/- button after the number goes into storedNum
    }

    // adding to display
    function display(value) {
        if (current.innerText == "0") {
            current.innerText = "";
        }
        select(value);
        current.innerText += value;
    }

    // Clearing
    function clear() {
        // console.log("clear");
        storedNum = 0;
        past.innerText = "";
        storedOp = "";
        current.innerText = 0;
        select("_");
    }

    // Adding/removing negative
    var negative = document.getElementById("Negative");
    function negativeOp() {
        select("--");
        if (negative.classList.contains("activated")) {
            negative.classList.remove("activated");
            negative.classList.add("deactivated");
            // current.innerText = current.innerText.substring(1, current.innerText.length); // DEBUG: for some reason sometimes causes to remove the first number when there's no '-' value but it shouldn't activate in the first place.
            current.innerText = current.innerText.substring(current.innerText.indexOf('-') + 1, current.innerText.length);
            return; //return to end the function when it activates so it doesnt deactivate
        }
        if (negative.classList.contains("deactivated")) {
            negative.classList.remove("deactivated");
            negative.classList.add("activated");
            current.innerText = "-" + current.innerText;
        }
    }

    // highlights when keys get pressed/selected
    function select(id) {
        var key = document.getElementsByClassName(id)[0];
        key.classList.add("selected");
        setTimeout(() => {
            key.classList.remove("selected");
        }, 150);
    }
}