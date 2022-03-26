import React from 'react';
import TemperatureInput from "./TemperatureInput.js";
import BoilingVerdict from "./BoilingVerdict.js";

// When several components need to reflect the same changing data.
// It is recommended to lift the shared state up to their closest common ancestor.

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

// These two functions convert numbers. We will write another function that takes a string temperature
// and a converter function as arguments and returns a string.
// We will use it to calculate the value of one input based on the other input.

// It returns an empty string on an invalid temperature, and it keeps the output rounded to the third decimal place.

function tryConvert(temperature, convert)
{
    const input = parseFloat(temperature);
    if (Number.isNaN(input))
    {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function toCelsius(fahrenheit)
{
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius)
{
    return (celsius * 9 / 5) + 32;
}

// In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
// This is called “lifting state up”. We will remove the local state from the TemperatureInput and move it into the Calculator instead.
// If the Calculator owns the shared state, it becomes the “source of truth” for the current temperature in both inputs.
// It can instruct them both to have values that are consistent with each other.
// Since the props of both TemperatureInput components are coming from the same parent Calculator component, the two inputs will always be in sync.

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);
        // We will store the current input’s temperature and scale in its local state.
        // This is the state we “lifted up” from the inputs, and it will serve as the “source of truth” for both of them.
        // It is the minimal representation of all the data we need to know in order to render both inputs.
        this.state = {temperature: '', scale: 'c'};
    }

    // When it previously rendered, the Calculator had specified that onTemperatureChange of the Celsius TemperatureInput
    // is the Calculator’s handleCelsiusChange method, and onTemperatureChange of the Fahrenheit TemperatureInput is the
    // Calculator’s handleFahrenheitChange method. So either of these two Calculator methods gets called depending on which input we edited.
    // Inside these methods, the Calculator component asks React to re-render itself by calling this.setState()
    // with the new input value and the current scale of the input we just edited.
    handleCelsiusChange = (temperature) =>
    {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange = (temperature) =>
    {
        this.setState({scale: 'f', temperature});
    }

    render()
    {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        // We could have stored the value of both inputs, but it turns out to be unnecessary.
        // It is enough to store the value of the most recently changed input, and the scale that it represents.
        // We can then infer the value of the other input based on the current temperature and scale alone.
        // React calls the Calculator component’s render method to learn what the UI should look like.
        // The values of both inputs are recomputed based on the current temperature and the active scale.
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
           <div>
               <TemperatureInput
                   scale="c"
                   temperature={celsius}
                   onTemperatureChange={this.handleCelsiusChange} />
               <TemperatureInput
                   scale="f"
                   temperature={fahrenheit}
                   onTemperatureChange={this.handleFahrenheitChange} />
               <BoilingVerdict
                   celsius={parseFloat(celsius)} />
           </div>
        );
    }
}

export default Calculator;

