"use client";
import React, { useState } from 'react';
import AuthenticatedPage from "@/app/dashboard/AuthenticatedPage";
import {
    TextInput,
    Container,
    Paper,
    Stack,
    Title,
    Text,
    Button,
    Group,
    Radio,
    Card,
    Grid,
    Divider,
    Select,
    Checkbox,
    ThemeIcon,
    Tooltip,
    Alert
} from "@mantine/core";
import { useForm } from '@mantine/form';
import {
    IconCreditCard,
    IconBrandPaypal,
    IconBuildingBank,
    IconShieldCheck,
    IconShieldLock,
    IconInfoCircle,
} from "@tabler/icons-react";

interface CheckoutPageProps {
    // You can add props like order total, etc. here
}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
    const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal' | 'bank-transfer'>('credit-card');
    const [sameBillingAddress, setSameBillingAddress] = useState(true);

    const months = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        return { value: String(month).padStart(2, '0'), label: String(month).padStart(2, '0') };
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => {
        const year = currentYear + i;
        return { value: String(year), label: String(year) };
    });

    // Sample order summary data
    const orderSummary = {
        subtotal: 199.97,
        tax: 16.50,
        total: 216.47,
        items: [
            { name: "Premium Package", price: 149.99 },
            { name: "Additional Service", price: 49.98 }
        ]
    };

    const form = useForm({
        initialValues: {
            // Card Information
            cardholderName: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            
            // Billing Information
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US',
            
            // Separate billing if needed
            billingFirstName: '',
            billingLastName: '',
            billingAddress: '',
            billingCity: '',
            billingState: '',
            billingZipCode: '',
            billingCountry: 'US',
            
            // Terms
            acceptTerms: false
        },
        
        validate: {
            cardholderName: (value: string) => paymentMethod === 'credit-card' && !value ? 'Cardholder name is required' : null,
            cardNumber: (value: string) => {
                if (paymentMethod !== 'credit-card') return null;
                if (!value) return 'Card number is required';
                if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) return 'Invalid card number';
                return null;
            },
            expiryMonth: (value: string) => paymentMethod === 'credit-card' && !value ? 'Expiry month is required' : null,
            expiryYear: (value: string) => paymentMethod === 'credit-card' && !value ? 'Expiry year is required' : null,
            cvv: (value: string) => {
                if (paymentMethod !== 'credit-card') return null;
                if (!value) return 'CVV is required';
                if (!/^\d{3,4}$/.test(value)) return 'Invalid CVV';
                return null;
            },
            
            firstName: (value: string) => !value ? 'First name is required' : null,
            lastName: (value: string) => !value ? 'Last name is required' : null,
            email: (value: string) => !value ? 'Email is required' : (!/^\S+@\S+$/.test(value) ? 'Invalid email' : null),
            phone: (value: string) => !value ? 'Phone is required' : null,
            address: (value: string) => !value ? 'Address is required' : null,
            city: (value: string) => !value ? 'City is required' : null,
            state: (value: string) => !value ? 'State is required' : null,
            zipCode: (value: string) => !value ? 'ZIP code is required' : null,
            
            billingFirstName: (value: string) => !sameBillingAddress && !value ? 'First name is required' : null,
            billingLastName: (value: string) => !sameBillingAddress && !value ? 'Last name is required' : null,
            billingAddress: (value: string) => !sameBillingAddress && !value ? 'Address is required' : null,
            billingCity: (value: string) => !sameBillingAddress && !value ? 'City is required' : null,
            billingState: (value: string) => !sameBillingAddress && !value ? 'State is required' : null,
            billingZipCode: (value: string) => !sameBillingAddress && !value ? 'ZIP code is required' : null,
            acceptTerms: (value: boolean) => !value ? 'You must accept the terms and conditions' : null,
        }
    });

    const formatCardNumber = (value: string) => {
        return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    // Check if form is valid - enable/disable confirm button
    const isFormValid = () => {
        // Core validation for all payment types
        if (!form.values.firstName || !form.values.lastName || !form.values.email || 
            !form.values.phone || !form.values.address || !form.values.city || 
            !form.values.state || !form.values.zipCode || !form.values.acceptTerms) {
            return false;
        }

        // If billing address is different, validate those fields
        if (!sameBillingAddress) {
            if (!form.values.billingFirstName || !form.values.billingLastName || 
                !form.values.billingAddress || !form.values.billingCity || 
                !form.values.billingState || !form.values.billingZipCode) {
                return false;
            }
        }

        // Payment method specific validation
        if (paymentMethod === 'credit-card') {
            if (!form.values.cardholderName || !form.values.cardNumber || 
                !form.values.expiryMonth || !form.values.expiryYear || !form.values.cvv) {
                return false;
            }
            
            // Additional card validation
            if (!/^\d{16}$/.test(form.values.cardNumber.replace(/\s/g, ''))) {
                return false;
            }
            
            if (!/^\d{3,4}$/.test(form.values.cvv)) {
                return false;
            }
        }

        return true;
    };

    const handleSubmit = () => {
        if (form.validate().hasErrors) {
            return;
        }
        
        // Process payment and submit order here
        console.log("Processing payment", {
            paymentMethod,
            formValues: form.values
        });
        
        // Redirect to confirmation or process payment
    };

    return (
        <AuthenticatedPage>
            <Container size="xl" pt={40} py={75}>
                <Stack gap="xl">
                    <Title order={1} size="h2" fw={700} c="var(--mantine-color-primary-5).9">
                        Checkout
                    </Title>

                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Stack gap="xl">
                                {/* Payment Methods */}
                                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Group gap="xs">
                                            <ThemeIcon 
                                                color="var(--mantine-color-primary-5)"
                                                variant="light"
                                                size="lg"
                                                radius="xl"
                                            >
                                                <IconCreditCard size={20} />
                                            </ThemeIcon>
                                            <Title order={3} size="h4">Payment Method</Title>
                                        </Group>
                                        
                                        <Radio.Group
                                            value={paymentMethod}
                                            onChange={(value: string) => setPaymentMethod(value as 'credit-card' | 'paypal' | 'bank-transfer')}
                                        >
                                            <Stack gap="md">
                                                <Paper 
                                                    p="md" 
                                                    withBorder 
                                                    style={{ 
                                                        borderColor: paymentMethod === 'credit-card' 
                                                            ? 'var(--mantine-color-primary-5)' 
                                                            : undefined 
                                                    }}
                                                >
                                                    <Radio 
                                                        value="credit-card" 
                                                        label={
                                                            <Group gap="xs">
                                                                <IconCreditCard size={20} />
                                                                <Text>Credit or Debit Card</Text>
                                                            </Group>
                                                        } 
                                                    />
                                                </Paper>
                                                
                                                <Paper 
                                                    p="md" 
                                                    withBorder 
                                                    style={{ 
                                                        borderColor: paymentMethod === 'paypal' 
                                                            ? 'var(--mantine-color-primary-5)' 
                                                            : undefined 
                                                    }}
                                                >
                                                    <Radio 
                                                        value="paypal" 
                                                        label={
                                                            <Group gap="xs">
                                                                <IconBrandPaypal size={20} />
                                                                <Text>PayPal</Text>
                                                            </Group>
                                                        } 
                                                    />
                                                </Paper>
                                                
                                                <Paper 
                                                    p="md" 
                                                    withBorder 
                                                    style={{ 
                                                        borderColor: paymentMethod === 'bank-transfer' 
                                                            ? 'var(--mantine-color-primary-5)' 
                                                            : undefined 
                                                    }}
                                                >
                                                    <Radio 
                                                        value="bank-transfer" 
                                                        label={
                                                            <Group gap="xs">
                                                                <IconBuildingBank size={20} />
                                                                <Text>Bank Transfer</Text>
                                                            </Group>
                                                        } 
                                                    />
                                                </Paper>
                                            </Stack>
                                        </Radio.Group>
                                        
                                        {/* Credit Card Details */}
                                        {paymentMethod === 'credit-card' && (
                                            <Card withBorder p="lg" mt="md">
                                                <Stack gap="md">
                                                    <TextInput
                                                        label="Cardholder Name"
                                                        placeholder="Name as it appears on the card"
                                                        {...form.getInputProps('cardholderName')}
                                                        required
                                                    />
                                                    
                                                    <TextInput
                                                        label="Card Number"
                                                        placeholder="XXXX XXXX XXXX XXXX"
                                                        {...form.getInputProps('cardNumber')}
                                                        value={formatCardNumber(form.values.cardNumber)}
                                                        onChange={(event) => {
                                                            const value = event.currentTarget.value.replace(/\D/g, '').slice(0, 16);
                                                            form.setFieldValue('cardNumber', formatCardNumber(value));
                                                        }}
                                                        required
                                                    />
                                                    
                                                    <Group grow>
                                                        <Select
                                                            label="Expiration Month"
                                                            placeholder="MM"
                                                            data={months}
                                                            searchable
                                                            {...form.getInputProps('expiryMonth')}
                                                            required
                                                        />
                                                        
                                                        <Select
                                                            label="Expiration Year"
                                                            placeholder="YYYY"
                                                            data={years}
                                                            searchable
                                                            {...form.getInputProps('expiryYear')}
                                                            required
                                                        />
                                                        
                                                        <TextInput
                                                            label="CVV"
                                                            placeholder="123"
                                                            maxLength={4}
                                                            {...form.getInputProps('cvv')}
                                                            required
                                                            rightSection={
                                                                <Tooltip label="3 or 4 digit security code on the back of your card">
                                                                    <IconInfoCircle size={16} style={{ color: 'var(--mantine-color-gray-5)' }} />
                                                                </Tooltip>
                                                            }
                                                        />
                                                    </Group>
                                                </Stack>
                                            </Card>
                                        )}
                                        
                                        {/* PayPal Instructions */}
                                        {paymentMethod === 'paypal' && (
                                            <Alert title="PayPal" color="blue" icon={<IconBrandPaypal />}>
                                                You will be redirected to PayPal to complete your payment after confirming your order.
                                            </Alert>
                                        )}
                                        
                                        {/* Bank Transfer Instructions */}
                                        {paymentMethod === 'bank-transfer' && (
                                            <Alert title="Bank Transfer" color="teal" icon={<IconBuildingBank />}>
                                                Bank transfer details will be provided after you confirm your order. Please note processing may take 1-3 business days.
                                            </Alert>
                                        )}
                                    </Stack>
                                </Paper>

                                {/* Billing Information */}
                                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Group gap="xs">
                                            <ThemeIcon 
                                                color="var(--mantine-color-primary-5)"
                                                variant="light"
                                                size="lg"
                                                radius="xl"
                                            >
                                                <IconShieldLock size={20} />
                                            </ThemeIcon>
                                            <Title order={3} size="h4">Billing Information</Title>
                                        </Group>
                                        
                                        <Grid>
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="First Name"
                                                    placeholder="John"
                                                    {...form.getInputProps('firstName')}
                                                    required
                                                />
                                            </Grid.Col>
                                            
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="Last Name"
                                                    placeholder="Doe"
                                                    {...form.getInputProps('lastName')}
                                                    required
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        
                                        <Grid>
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="Email"
                                                    placeholder="john@example.com"
                                                    {...form.getInputProps('email')}
                                                    required
                                                />
                                            </Grid.Col>
                                            
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="Phone"
                                                    placeholder="(555) 123-4567"
                                                    {...form.getInputProps('phone')}
                                                    required
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        
                                        <TextInput
                                            label="Address"
                                            placeholder="123 Main St, Apt 4B"
                                            {...form.getInputProps('address')}
                                            required
                                        />
                                        
                                        <Grid>
                                            <Grid.Col span={{ base: 12, sm: 6 }}>
                                                <TextInput
                                                    label="City"
                                                    placeholder="New York"
                                                    {...form.getInputProps('city')}
                                                    required
                                                />
                                            </Grid.Col>
                                            
                                            <Grid.Col span={{ base: 6, sm: 3 }}>
                                                <TextInput
                                                    label="State"
                                                    placeholder="NY"
                                                    {...form.getInputProps('state')}
                                                    required
                                                />
                                            </Grid.Col>
                                            
                                            <Grid.Col span={{ base: 6, sm: 3 }}>
                                                <TextInput
                                                    label="ZIP Code"
                                                    placeholder="10001"
                                                    {...form.getInputProps('zipCode')}
                                                    required
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        
                                        <Select
                                            label="Country"
                                            data={[
                                                { value: 'US', label: 'United States' },
                                                { value: 'CA', label: 'Canada' },
                                                { value: 'UK', label: 'United Kingdom' },
                                                { value: 'AU', label: 'Australia' }
                                            ]}
                                            {...form.getInputProps('country')}
                                            required
                                        />
                                        
                                        <Checkbox
                                            label="Shipping address is the same as billing address"
                                            checked={sameBillingAddress}
                                            onChange={(event) => setSameBillingAddress(event.currentTarget.checked)}
                                            mt="sm"
                                        />
                                        
                                        {!sameBillingAddress && (
                                            <Stack gap="md" mt="md">
                                                <Divider label="Shipping Address" labelPosition="center" />
                                                
                                                <Grid>
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <TextInput
                                                            label="First Name"
                                                            placeholder="John"
                                                            {...form.getInputProps('billingFirstName')}
                                                            required
                                                        />
                                                    </Grid.Col>
                                                    
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <TextInput
                                                            label="Last Name"
                                                            placeholder="Doe"
                                                            {...form.getInputProps('billingLastName')}
                                                            required
                                                        />
                                                    </Grid.Col>
                                                </Grid>
                                                
                                                <TextInput
                                                    label="Address"
                                                    placeholder="123 Main St, Apt 4B"
                                                    {...form.getInputProps('billingAddress')}
                                                    required
                                                />
                                                
                                                <Grid>
                                                    <Grid.Col span={{ base: 12, sm: 6 }}>
                                                        <TextInput
                                                            label="City"
                                                            placeholder="New York"
                                                            {...form.getInputProps('billingCity')}
                                                            required
                                                        />
                                                    </Grid.Col>
                                                    
                                                    <Grid.Col span={{ base: 6, sm: 3 }}>
                                                        <TextInput
                                                            label="State"
                                                            placeholder="NY"
                                                            {...form.getInputProps('billingState')}
                                                            required
                                                        />
                                                    </Grid.Col>
                                                    
                                                    <Grid.Col span={{ base: 6, sm: 3 }}>
                                                        <TextInput
                                                            label="ZIP Code"
                                                            placeholder="10001"
                                                            {...form.getInputProps('billingZipCode')}
                                                            required
                                                        />
                                                    </Grid.Col>
                                                </Grid>
                                                
                                                <Select
                                                    label="Country"
                                                    data={[
                                                        { value: 'US', label: 'United States' },
                                                        { value: 'CA', label: 'Canada' },
                                                        { value: 'UK', label: 'United Kingdom' },
                                                        { value: 'AU', label: 'Australia' }
                                                    ]}
                                                    {...form.getInputProps('billingCountry')}
                                                    required
                                                />
                                            </Stack>
                                        )}
                                    </Stack>
                                </Paper>
                                
                                {/* Terms and Conditions */}
                                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                                    <Stack gap="md">
                                        <Checkbox
                                            label={
                                                <Text>
                                                    I agree to the Terms of Service and Privacy Policy
                                                </Text>
                                            }
                                            {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
                                            required
                                        />
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid.Col>
                        
                        {/* Order Summary */}
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper shadow="sm" radius="lg" p="xl" withBorder style={{ position: 'sticky', top: 75 }}>
                                <Stack gap="md">
                                    <Title order={3} size="h4">Order Summary</Title>
                                    
                                    <Stack gap="xs">
                                        {orderSummary.items.map((item, idx) => (
                                            <Group key={idx} justify="space-between">
                                                <Text>{item.name}</Text>
                                                <Text fw={500}>${item.price.toFixed(2)}</Text>
                                            </Group>
                                        ))}
                                    </Stack>
                                    
                                    <Divider my="xs" />
                                    
                                    <Group justify="space-between">
                                        <Text>Subtotal</Text>
                                        <Text fw={500}>${orderSummary.subtotal.toFixed(2)}</Text>
                                    </Group>
                                    
                                    <Group justify="space-between">
                                        <Text>Taxes</Text>
                                        <Text fw={500}>${orderSummary.tax.toFixed(2)}</Text>
                                    </Group>
                                    
                                    <Divider my="xs" />
                                    
                                    <Group justify="space-between">
                                        <Text size="lg" fw={700}>Total</Text>
                                        <Text size="lg" fw={700} c="var(--mantine-color-primary-6)">
                                            ${orderSummary.total.toFixed(2)}
                                        </Text>
                                    </Group>
                                    
                                    <Button
                                        mt="md"
                                        size="lg"
                                        fullWidth
                                        disabled={!isFormValid()}
                                        onClick={handleSubmit}
                                        variant="gradient"
                                        gradient={{from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)'}}
                                    >
                                        Confirm Order
                                    </Button>
                                    
                                    <Group justify="center" gap={10} mt="xs">
                                        <IconShieldCheck size={18} style={{ color: 'var(--mantine-color-primary-6)' }} />
                                        <Text size="sm" c="dimmed">Secure Checkout</Text>
                                    </Group>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>
        </AuthenticatedPage>
    );
}

export default CheckoutPage;