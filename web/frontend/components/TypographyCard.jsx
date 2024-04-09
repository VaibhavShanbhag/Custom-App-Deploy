import React, { useState } from 'react';
import { Page, Card, FormLayout, TextField, Select, Button, Form } from '@shopify/polaris';
import { useAuthenticatedFetch } from '../hooks';

export const TypographyCard = () => {
    const fetch = useAuthenticatedFetch();
    const [formData, setFormData] = useState({
        baseValue: '16',
        ratioValue: '1.8',
        primaryFont: 'Old Standard TT',
        secondaryFont: 'Old Standard TT',
        headingSize: 'BASE',
        headingWeight: 'BASE',
        headingLetterCase: 'UPPER',
        headingColor: '#000000'
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("/api/checkout/branding", {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(formData)
        });
        console.log(res);
        setToast(true);
    };

    return (
        <Card sectioned>
            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <TextField
                        label="Typography Base Size "
                        value={formData.baseValue}
                        onChange={(value) => handleChange('baseValue', value)}
                        placeholder=" Its value should be between 12.0 and 18.0."
                    />
                    <TextField
                        label="Typography Ratio Size "
                        value={formData.ratioValue}
                        onChange={(value) => handleChange('ratioValue', value)}
                        placeholder="Its value should be between 1.0 and 1.4."
                    />
                    <Select
                        label="Primary Surface Text Font"
                        options={[
                            { label: 'Old Standard TT', value: 'Old Standard TT' },
                            { label: 'Nobile', value: 'Nobile' },
                            { label: 'Playball', value: 'Playball' },
                            { label: 'Roboto', value: 'Roboto' }
                        ]}
                        value={formData.primaryFont}
                        onChange={(value) => {
                            handleChange('primaryFont', value);
                        }}
                    />
                    <Select
                        label="Secondary Surface Button Text Font"
                        options={[
                            { label: 'Old Standard TT', value: 'Old Standard TT' },
                            { label: 'Nobile', value: 'Nobile' },
                            { label: 'Playball', value: 'Playball' },
                            { label: 'Roboto', value: 'Roboto' }
                        ]}
                        value={formData.secondaryFont}
                        onChange={(value) => {
                            handleChange('secondaryFont', value);
                        }}
                    />
                    <Select
                        label="Style for Level 1 Headings: Size"
                        options={[
                            { label: 'BASE', value: 'BASE' },
                            { label: 'LARGE', value: 'LARGE' },
                            { label: 'MEDIUM', value: 'MEDIUM' }
                        ]}
                        value={formData.headingSize}
                        onChange={(value) => {
                            handleChange('headingSize', value);
                        }}
                    />
                    <Select
                        label="Style for Level 1 Headings: Weight"
                        options={[
                            { label: 'BASE', value: 'BASE' },
                            { label: 'BOLD', value: 'BOLD' }
                        ]}
                        value={formData.headingWeight}
                        onChange={(value) => {
                            handleChange('headingWeight', value);
                        }}
                    />
                    <Select
                        label="Style for Level 1 Headings: Letter Case"
                        options={[
                            { label: 'UPPER', value: 'UPPER' },
                            { label: 'LOWER', value: 'LOWER' },
                            { label: 'NONE', value: 'NONE' }
                        ]}
                        value={formData.headingLetterCase}
                        onChange={(value) => {
                            handleChange('headingLetterCase', value);
                        }}
                    />
                    <div>
                        <label htmlFor="headingColor">Color for Primary and Secondary Button</label>
                        <input
                            type="color"
                            style={{
                                marginLeft: "10px"
                            }}
                            id="headingColor"
                            value={formData.headingColor}
                            onChange={(e) => handleChange('headingColor', e.target.value)}
                        />
                    </div>
                    <Button submit>Update Changes</Button>
                </FormLayout>
            </Form>
        </Card>
    );
};