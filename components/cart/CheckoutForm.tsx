import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import tw from 'twin.macro'
import { Formik, Form, Field } from 'formik';

import Dropdown from 'styles/Dropdown';
import buttons from 'styles/Button';
import countryList from 'react-select-country-list';
import { formatPrice } from 'components/popups/PostDetails';

interface CheckoutValues {
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    company: string;
    address: string;
    apartment: string;
    shipping: string;
}

const CheckoutForm = (
    { country, page, setPage }: {
        country: string;
        page: number;
        setPage: (x: number) => void;
    }
) => {

    const [selectedCountry, setSelectedCountry] = useState(country || '');
    const countries = useMemo(() => countryList().getLabels(), []);

    const pages = ['Information', 'Shipping', 'Payment'];
    const styles = {
        label: tw`text-[#333333] text-[22px] font-bold`,
        input: tw`border border-[#D9D9D9] focus:border-[#888888] outline-none rounded-[6px] w-full h-12 px-4`,
        back: tw`bg-[#F2F2F2] rounded-[6px] w-full flex items-center px-4 h-14 gap-x-6 text-[14px]`
    }

    // shipping options
    const shippingOptions = [
        'Fast(ish) Shipping',
        'Fast Shipping',
        'Faster Shipping'
    ]
    const ShippingRadio = (
        props: { text: string, price: string }
    ) => {
        return <label
            tw='w-full px-5 h-[60px] flex text-[14px] text-[#737373] font-semibold items-center'
        >
            <Field
                type="radio"
                name='shipping'
                value={props.text}
                tw="w-5 h-5"
                css={{ 'accent-color': '#E24E4D' }}
            />
            <div tw='ml-6'>{props.text}</div>
            <div tw='ml-auto'>{props.price}</div>
        </label >
    }

    // input refs
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const refs = [null, emailRef, addressRef];
    const [formFocus, setFormFocus] = useState(0);

    useEffect(() => {
        if (formFocus) {
            refs[formFocus]?.current?.focus();
            setFormFocus(0);
        }
    })

    return <div tw='max-w-[572px] w-full mt-16 pb-[100px]'>
        <Image
            src='/assets/images/Pkazo.svg'
            alt='Pkazo logo'
            width='137'
            height='48'
        />
        <div tw='mt-3 flex items-center gap-x-3'>
            {pages.map((p, i) =>
                <>
                    {i > 0 &&
                        <Image
                            src='/assets/svgs/arrow_right.svg'
                            alt='section break'
                            width='6'
                            height='10'
                        />
                    }
                    <div
                        tw='text-[14px] font-semibold'
                        css={[page === i ? tw`text-black` : tw`text-[#737373]`]}
                    >
                        {p}
                    </div>
                </>
            )}
        </div>
        {/* Form section */}
        <div tw='mt-16'>
            <Formik<CheckoutValues>
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    country: country,
                    company: '',
                    address: '',
                    apartment: '',
                    shipping: '',
                }}
                validateOnChange={false}
                validate={() => { 0 }}
                onSubmit={() => { 0 }}
            >
                {({ values }) => (
                    <Form>
                        {page === 0 && (
                            <>
                                <div css={[styles.label]}>Contact Information</div>
                                <Field
                                    type="input"
                                    name="email"
                                    css={[styles.input, tw`mt-6`]}
                                    placeholder="Email"
                                    innerRef={emailRef}
                                />
                                <div css={[styles.label, tw`mt-16`]}>Shipping Address</div>
                                <div tw='mt-6 flex flex-col gap-y-4'>
                                    <Field
                                        as={Dropdown}
                                        type="select"
                                        name="country"
                                        appearance={[styles.input, tw`pr-6 overflow-ellipsis`]}
                                        triangle
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            values.country = event.target.value;
                                            setSelectedCountry(values.country);
                                        }}
                                    >
                                        <option value={selectedCountry}>{selectedCountry}</option>
                                        {countries.map((i, ind) =>
                                            i !== selectedCountry && (
                                                <option key={ind} value={i}>
                                                    {i}
                                                </option>
                                            )
                                        )}
                                    </Field>
                                    <div tw='flex gap-x-4'>
                                        <Field
                                            type="input"
                                            name="firstName"
                                            css={[styles.input]}
                                            placeholder="First name"
                                        />
                                        <Field
                                            type="input"
                                            name="lastName"
                                            css={[styles.input]}
                                            placeholder="Last name"
                                        />
                                    </div>
                                    <Field
                                        type="input"
                                        name="company"
                                        css={[styles.input]}
                                        placeholder="Company (optional)"
                                    />
                                    <Field
                                        type="input"
                                        name="address"
                                        css={[styles.input]}
                                        placeholder="Address"
                                        innerRef={addressRef}
                                    />
                                    <Field
                                        type="input"
                                        name="apartment"
                                        css={[styles.input]}
                                        placeholder="Apartment, suite, etc. (optional)"
                                    />
                                </div>
                                <div tw='mt-16 w-full flex justify-end'>
                                    <button
                                        type='button'
                                        css={[buttons.red, tw`px-[30px] h-[52px]`]}
                                        onClick={() => setPage(1)}
                                    // onClick={() => emailRef.current?.focus()}
                                    >
                                        Continue to Shipping
                                    </button>
                                </div>
                            </>
                        )}
                        {page === 1 && (
                            <>
                                <div css={[styles.back]}>
                                    <div tw='text-[#5B5B5B] font-semibold w-12 flex-none'>
                                        Contact
                                    </div>
                                    <div tw='text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                        {values.email}
                                    </div>
                                    <div
                                        tw='text-[#222222] font-bold cursor-pointer flex-none'
                                        onClick={() => {
                                            setFormFocus(1);
                                            setPage(0);
                                        }}
                                    >
                                        Change
                                    </div>
                                </div>
                                <div css={[styles.back, tw`mt-4`]}>
                                    <div tw='text-[#5B5B5B] font-semibold w-12 flex-none'>
                                        Ship to
                                    </div>
                                    <div tw='text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                        {values.address}, {values.country}
                                    </div>
                                    <div
                                        tw='text-[#222222] font-bold cursor-pointer flex-none'
                                        onClick={() => {
                                            setFormFocus(2);
                                            setPage(0);
                                        }}
                                    >
                                        Change
                                    </div>
                                </div>
                                <div css={[styles.label, tw`mt-16`]}>Shipping method</div>
                                <div tw='mt-6 border border-[#D9D9D9] rounded-[6px] '>
                                    <ShippingRadio
                                        text={shippingOptions[0]}
                                        price='Free'
                                    />
                                    <div tw='h-[1px] bg-[#D9D9D9]' />
                                    <ShippingRadio
                                        text={shippingOptions[1]}
                                        price={formatPrice(16)}
                                    />
                                    <div tw='h-[1px] bg-[#D9D9D9]' />
                                    <ShippingRadio
                                        text={shippingOptions[2]}
                                        price={formatPrice(20)}
                                    />
                                </div>
                                <div tw='mt-16 w-full flex justify-between'>
                                    <button
                                        type='button'
                                        css={[buttons.white, tw`px-[30px] h-[52px]`]}
                                        onClick={() => setPage(0)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type='button'
                                        css={[buttons.red, tw`px-[30px] h-[52px]`]}
                                        onClick={() => setPage(2)}
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </>
                        )}
                        {page === 2 && (
                            <>
                                <div css={[styles.back]}>
                                    <div tw='text-[#5B5B5B] font-semibold w-12 flex-none'>
                                        Contact
                                    </div>
                                    <div tw='text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                        {values.email}
                                    </div>
                                    <div
                                        tw='text-[#222222] font-bold cursor-pointer flex-none'
                                        onClick={() => {
                                            setFormFocus(1);
                                            setPage(0);
                                        }}
                                    >
                                        Change
                                    </div>
                                </div>
                                <div css={[styles.back, tw`mt-4`]}>
                                    <div tw='text-[#5B5B5B] font-semibold w-12 flex-none'>
                                        Ship to
                                    </div>
                                    <div tw='text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                        {values.address}, {values.country}
                                    </div>
                                    <div
                                        tw='text-[#222222] font-bold cursor-pointer flex-none'
                                        onClick={() => {
                                            setFormFocus(2);
                                            setPage(0);
                                        }}
                                    >
                                        Change
                                    </div>
                                </div>
                                <div css={[styles.back, tw`mt-4`]}>
                                    <div tw='text-[#5B5B5B] font-semibold w-12 flex-none'>
                                        Method
                                    </div>
                                    <div tw='text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                        {values.shipping}
                                    </div>
                                    <div
                                        tw='text-[#222222] font-bold cursor-pointer flex-none'
                                        onClick={() => {
                                            setPage(1);
                                        }}
                                    >
                                        Change
                                    </div>
                                </div>
                                <div css={[styles.label, tw`mt-16`]}>Payment</div>
                                put strip stuff here
                                <div tw='mt-16 w-full flex justify-between'>
                                    <button
                                        type='button'
                                        css={[buttons.white, tw`px-[30px] h-[52px]`]}
                                        onClick={() => setPage(1)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type='button'
                                        css={[buttons.red, tw`px-[30px] h-[52px]`]}
                                        onClick={() => setPage(2)}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    </div>
}
export default CheckoutForm;