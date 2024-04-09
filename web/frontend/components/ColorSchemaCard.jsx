import React, { useState } from 'react';
import { Card, Button, Collapsible, Stack, Toast } from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks';

export function ColorSchemaCard() {
    const fetch = useAuthenticatedFetch()
    const [openScheme1, setOpenScheme1] = useState(false);
    const [openScheme2, setOpenScheme2] = useState(false);
    const [colorsScheme1, setColorsScheme1] = useState(Array(7).fill('#FF2165'));
    const [colorsScheme2, setColorsScheme2] = useState(Array(7).fill('#252264'));
    const defination = [
        "Choose color for base background",
        "Choose color for base Text",
        "Choose color for control background",
        "Choose color for control border",
        "Choose color for control selected background",
        "Choose color for control selected border",
        "Choose color for primary button hover background"
    ]
   
    const handleToggleScheme1 = () => {
      setOpenScheme1(!openScheme1);
    };
   
    const handleToggleScheme2 = () => {
      setOpenScheme2(!openScheme2);
    };
   
    const handleColorChangeScheme1 = (index, value) => {
      const updatedColors = [...colorsScheme1];
      updatedColors[index] = value;
      setColorsScheme1(updatedColors);
    };
   
    const handleColorChangeScheme2 = (index, value) => {
      const updatedColors = [...colorsScheme2];
      updatedColors[index] = value;
      setColorsScheme2(updatedColors);
    };
   
    const handleSubmitScheme1 = async (event) => {
      event.preventDefault();
      const colorSchme1 = {
        baseBg:colorsScheme1[0],
        baseText:colorsScheme1[1],
        conBg:colorsScheme1[2],
        conBo:colorsScheme1[3],
        conSeBg:colorsScheme1[4],
        conSeBo:colorsScheme1[5],
        primaryButtonHoverBack:colorsScheme1[6]
      }
      const response = await fetch("/api/checkout/branding/scheme1",{
        method: "POST",
        body: JSON.stringify(colorSchme1),
        headers: new Headers({'content-type': 'application/json'}),
      })
      console.log(response);
    };
   
    const handleSubmitScheme2 = async (event) => {
      event.preventDefault();
      const colorSchme2 = {
        baseBg:colorsScheme2[0],
        baseText:colorsScheme2[1],
        conBg:colorsScheme2[2],
        conBo:colorsScheme2[3],
        conSeBg:colorsScheme2[4],
        conSeBo:colorsScheme2[5],
        primaryButtonHoverBack:colorsScheme2[6]
      }
      const response = await fetch("/api/checkout/branding/scheme2",{
        method: "POST",
        body: JSON.stringify(colorSchme2),
        headers: new Headers({'content-type': 'application/json'}),
      })
      console.log(response);
    };
   
    const renderColorInputs = (colors, handleColorChange) => {
      return colors.map((color, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <label htmlFor={`color${index + 1}`} style={{marginRight:"10px"}}>{`${defination[index]}-->`}</label>
          <input
            type="color"
            id={`color${index + 1}`}
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
          />
        </div>
      ));
    };

    return (
        <Stack vertical>
            <Card sectioned>
                <Button onClick={handleToggleScheme1} ariaExpanded={openScheme1}>
                    {openScheme1 ? 'Hide Scheme 1 Content' : 'Show Scheme 1 Content'}
                </Button>
                <Collapsible open={openScheme1} transition={{ duration: '150ms', timingFunction: 'ease' }}>
                    <Card.Section>
                        <form onSubmit={handleSubmitScheme1}>
                            {renderColorInputs(colorsScheme1, handleColorChangeScheme1)}
                            <Button submit primary>Update Changes Scheme 1</Button>
                        </form>
                    </Card.Section>
                </Collapsible>
            </Card>
            <Card sectioned>
                <Button onClick={handleToggleScheme2} ariaExpanded={openScheme2}>
                    {openScheme2 ? 'Hide Scheme 2 Content' : 'Show Scheme 2 Content'}
                </Button>
                <Collapsible open={openScheme2} transition={{ duration: '150ms', timingFunction: 'ease' }}>
                    <Card.Section>
                        <form onSubmit={handleSubmitScheme2}>
                            {renderColorInputs(colorsScheme2, handleColorChangeScheme2)}
                            <Button submit primary>Update Changes Scheme 2</Button>
                        </form>
                    </Card.Section>
                </Collapsible>
            </Card>
        </Stack>
    );
}