import React from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

// We know that props are read-only. When the temperature was in the local state, the TemperatureInput could just call this.setState() to change it.
// However, now that the temperature is coming from the parent as a prop, the TemperatureInput has no control over it.
// In React, this is usually solved by making a component “controlled”.
// Just like the DOM <input> accepts both a value and an onChange prop,
// so can the custom TemperatureInput accept both temperature and onTemperatureChange props from its parent Calculator.
class TemperatureInput extends React.Component
{
    // When the TemperatureInput wants to update its temperature, it calls this.props.onTemperatureChange.
    // The onTemperatureChange prop will be provided together with the temperature prop by the parent Calculator component.
    // It will handle the change by modifying its own local state, thus re-rendering both inputs with the new values.
    handleChange = (e) =>
    {
        this.props.onTemperatureChange(e.target.value);
    }

    render()
    {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        );
    };
}

export default TemperatureInput;
