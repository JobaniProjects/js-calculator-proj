import React from "react";
import './styles.scss';

const calcGridOne = [
    {
        btnName: "AC",
        btnId: "clear"
    },
    {
        btnName: "+",
        btnId: "add"
    }
];
const calcGridTwo = [
    {
        btnName: "1",
        btnId: "one"
    },
    {
        btnName: "2",
        btnId: "two"
    },
    {
        btnName: "3",
        btnId: "three"
    },
    {
        btnName: "-",
        btnId: "subtract"
    },
    {
        btnName: "4",
        btnId: "four"
    },
    {
        btnName: "5",
        btnId: "five"
    },
    {
        btnName: "6",
        btnId: "six"
    },
    {
        btnName: "*",
        btnId: "multiply"
    },
    {
        btnName: "7",
        btnId: "seven"
    },
    {
        btnName: "8",
        btnId: "eight"
    },
    {
        btnName: "9",
        btnId: "nine"
    },
    {
        btnName: "/",
        btnId: "divide"
    }
]

const calcGridThree = [
    {
        btnName: "0",
        btnId: "zero"
    },
    {
        btnName: ".",
        btnId: "decimal"
    },
    {
        btnName: "=",
        btnId: "equals"
    }
];

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: "0",
            equationArr: [],
            equation: ""
            
        }
        this.handleInput = this.handleInput.bind(this);
        this.equalsAns = this.equalsAns.bind(this);
    }    

    //Handles the buttons pressed by user
    handleInput(input){
        this.setState((prevState) => {
            const updatedEquationArr = [...prevState.equationArr];
            const lastInput = updatedEquationArr[updatedEquationArr.length - 1];
            const secondLastInput = updatedEquationArr[updatedEquationArr.length - 2];
            const mathSymbols = ["+", "*", "/"];
            const allOperators = ["+", "-", "*", "/"];
    
            if (input === "AC") {
                return {
                    equationArr: [],
                    display: "0",
                };
            } else if (input === "=") {
                this.equalsAns();
                return null;
            } else if (input === "0" && prevState.display === "0") {
                return null;
            } else if (input === ".") {
                const displayString = prevState.display.toString();
                const currentNumber = displayString.split(/[\+\-\*\/]/).pop();
                if (currentNumber.includes(".")) {
                    return null;
                }
            }
    
            // Handling multiple consecutive operators
            if (allOperators.includes(input)) {
                if (mathSymbols.includes(lastInput)) {
                    // If input is "-" after * or /, treat as a negative number
                    if (input === "-" && (lastInput === "*" || lastInput === "/")) {
                        updatedEquationArr.push(input);
                    } else {
                        updatedEquationArr[updatedEquationArr.length - 1] = input;
                    }
                } else if (lastInput === "-" && mathSymbols.includes(secondLastInput)) {
                    // Replace second last operator and keep minus as part of the negative number logic
                    updatedEquationArr.splice(updatedEquationArr.length - 2, 2, input);
                } else {
                    updatedEquationArr.push(input);
                }
            } else {
                updatedEquationArr.push(input);
            }
    
            return {
                equationArr: updatedEquationArr,
                display: updatedEquationArr.join(""),
            };
        });
    }

    //Answers math problem and displays it
    equalsAns(){
        try {
            let answer = eval(this.state.display);
            this.setState({
                display: answer,
                equationArr: [answer]
            });
        } catch (error) {
            this.setState({
                display: "Error",
                equationArr:[]
            });
        }
    }

    render(){
        return (
            <div className="calc-container">
                {/* <p>TEST 2 TEST 2 TEST 2</p> */}

                <div id="display">{this.state.display}</div>

                <div className="grid-container-1">
                    {calcGridOne.map((el)=>(
                        <div id={el.btnId} onClick={()=>{this.handleInput(el.btnName)}}>{el.btnName}</div>
                    ))}
                </div>

                <div className="grid-container-2">
                    {calcGridTwo.map((el)=>(
                        <div id={el.btnId} onClick={()=>{this.handleInput(el.btnName)}}>{el.btnName}</div>
                    ))}
                </div>
                
                <div className="grid-container-3">
                    {calcGridThree.map((el)=>(
                        <div id={el.btnId} onClick={()=>{this.handleInput(el.btnName)}}>{el.btnName}</div>
                    ))}
                </div>

                <footer className="text-center">
                    <hr />
                     Created by <a href="https://jobaniprojects.github.io/Portfolio/index.html" target="_blank" rel="noreferrer" className="name-a">David Zenteno</a>
                </footer>
            </div>
        );
    }
}

export default Calculator;