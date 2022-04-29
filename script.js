function centerElement() {
    var child = document.getElementById("Calculator");
    var parent = document.getElementsByTagName("Body")[0];
    var x2 = child.offsetWidth;
    var x1 = parent.offsetWidth;
    var y2 = child.offsetHeight;
    var y1 = parent.offsetHeight;
    var marginX = (x1-x2) / 2;
    var marginY = (y2-y1) / 2;
    child.style.top = marginY + "px";
    child.style.left = marginX + "px";
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
            case "=": operatorDoes("/"); break;
            case "/": operatorDoes("/"); break;
            case "*": operatorDoes("*"); break;
            case "+": operatorDoes("+"); break;
            case "-": operatorDoes("="); break;
            case "Enter": operatorDoes("="); break;
        }
    })
    // DEBUG: changed all parseInt to parseFloat so it accepts the "." value
    function operatorDoes(operator) {
        switch (operator) {
            case "%":
                current.innerText = parseFloat(current.innerText) / 100;
                evaluate();
                past.innerText = "";
                current.innerText = storedNum;
                storedNum = 0;
                storedOp = "";
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
    }

    function evaluate() {
        switch (storedOp) {
            case "/":
                storedNum /= parseFloat(current.innerText);
                past.innerText = storedNum;
                break;
            case "*":
                storedNum *= parseFloat(current.innerText)
                past.innerText = storedNum;
                break;
            case "-":
                storedNum -= parseFloat(current.innerText);
                past.innerText = storedNum;
                break;
            case "+":
                storedNum += parseFloat(current.innerText);
                past.innerText = storedNum;
                break;
            default:
                storedNum = parseFloat(current.innerText);
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
        current.innerText += value;
    }

    // Clearing
    function clear() {
        // console.log("clear");
        storedNum = 0;
        past.innerText = "";
        storedOp = "";
        current.innerText = 0;
    }

    // Adding/removing negative
    var negative = document.getElementById("Negative");
    function negativeOp() {
        if (negative.classList.contains("activated")) {
            negative.classList.remove("activated");
            negative.classList.add("deactivated");
            // current.innerText = current.innerText.substring(1, current.innerText.length); // DEBUG: for some reason sometimes causes to remove the first number when there's no '-' value but it shouldn't activate in the first place.
            current.innerText = current.innerText.substring(current.innerText.indexOf('-') + 1, current.innerText.length);
            return;
        }
        if (negative.classList.contains("deactivated")) {
            negative.classList.remove("deactivated");
            negative.classList.add("activated");
            current.innerText = "-" + current.innerText;
        }
    }
}