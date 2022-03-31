import React from 'react';

function BoilingVerdict(props)
{
    if(props.celsius >= 100)
    {
        return <p>The water is boiling!</p>
    }

    return <p> The water is not boiling yet.</p>
}

export default BoilingVerdict;
