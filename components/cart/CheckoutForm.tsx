import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import tw from 'twin.macro'
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
interface CheckoutErrors {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    shipping?: string;
}

const CheckoutForm = (
    { country, page, setPage, isMobile, isLargeScreen }: {
        country: string;
        page: number;
        setPage: (x: number) => void;
        isMobile?: boolean;
        isLargeScreen?: boolean;
    }
) => {

    const [selectedCountry, setSelectedCountry] = useState(country || '');
    const countries = useMemo(() => countryList().getLabels(), []);

    const pages = ['Information', 'Shipping', 'Payment'];
    const styles = {
        label: tw`text-[#333333] text-[18px] md:text-[22px] font-semibold md:font-bold`,
        input: tw`text-[14px] md:text-[16px] border border-[#D9D9D9] focus:border-[#888888] outline-none rounded-[6px] w-full h-11 md:h-12 px-4`,
        back: tw`bg-[#F2F2F2] rounded-[6px] w-full flex items-center px-4 h-14 gap-x-6 text-[14px]`,
        error: tw`text-[12px] mt-[2px] text-[#A61A2E]`
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
    const [formFocus, setFormFocus] = useState(0);

    useEffect(() => {
        const refs = [null, emailRef, addressRef];
        if (formFocus) {
            refs[formFocus]?.current?.focus();
            setFormFocus(0);
        }
    }, [formFocus])

    return <div tw='max-w-[572px] w-full mt-8 lg:mt-16 pb-[100px] px-4 md:px-0'>
        {isLargeScreen &&
            <Image
                src='/assets/images/Pkazo.svg'
                alt='Pkazo logo'
                width='137'
                height='48'
            />
        }
        <div tw='md:mt-2 flex items-center gap-x-3'>
            {pages.map((p, i) =>
                <>
                    {i > 0 &&
                        <Image
                            src='/assets/svgs/arrow_right.svg'
                            alt='section break'
                            width={isMobile ? '6' : '8'}
                            height={isMobile ? '10' : '12'}
                        />
                    }
                    <div
                        tw='text-[14px] md:text-[16px] font-semibold cursor-pointer'
                        css={[page === i ? tw`text-black` : tw`text-[#737373]`]}
                        onClick={() => setPage(i)}
                    >
                        {p}
                    </div>
                </>
            )}
        </div>
        {/* Form section */}
        <div tw='mt-12 md:mt-16'>
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
                validate={(values) => {
                    console.log('validating')
                    const errors: CheckoutErrors = {};
                    if (!values.email) {
                        errors.email = 'Enter an email';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email';
                    }
                    if (!values.firstName) {
                        errors.firstName = 'Enter a first name';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Enter a last name';
                    }
                    if (!values.address) {
                        errors.address = 'Enter an address';
                    }
                    console.log(errors);
                    return errors;
                }}
                onSubmit={() => {
                    if (page < 2)
                        setPage(page + 1)
                }}
            >
                {({ values, errors }) => (
                    <Form>
                        {page === 0 && (
                            <>
                                <div css={[styles.label]}>Contact Information</div>
                                <div>
                                    <Field
                                        type="input"
                                        name="email"
                                        css={[styles.input, tw`mt-4 md:mt-6`, errors.email && tw`border-[#A61A2E]`]}
                                        placeholder="Email"
                                        innerRef={emailRef}
                                    />
                                    <div css={[styles.error]}>
                                        <ErrorMessage name='email' />
                                    </div>
                                </div>
                                <div css={[styles.label, tw`mt-12 md:mt-16`]}>Shipping Address</div>
                                <div tw='mt-4 md:mt-6 flex flex-col gap-y-3 md:gap-y-4'>
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
                                    <div tw='md:grid md:grid-cols-2 md:gap-x-4'>
                                        <div>
                                            <Field
                                                type="input"
                                                name="firstName"
                                                css={[styles.input, errors.firstName && tw`border-[#A61A2E]`]}
                                                placeholder="First name"
                                            />
                                            <div css={[styles.error]}>
                                                <ErrorMessage name='firstName' />
                                            </div>
                                        </div>
                                        <div tw='mt-3 md:mt-0'>
                                            <Field
                                                type="input"
                                                name="lastName"
                                                css={[styles.input, errors.lastName && tw`border-[#A61A2E]`]}
                                                placeholder="Last name"
                                            />
                                            <div css={[styles.error]}>
                                                <ErrorMessage name='lastName' />
                                            </div>
                                        </div>
                                    </div>
                                    <Field
                                        type="input"
                                        name="company"
                                        css={[styles.input]}
                                        placeholder="Company (optional)"
                                    />
                                    <div>
                                        <Field
                                            type="input"
                                            name="address"
                                            css={[styles.input, errors.address && tw`border-[#A61A2E]`]}
                                            placeholder="Address"
                                            innerRef={addressRef}
                                        />
                                        <div css={[styles.error]}>
                                            <ErrorMessage name='address' />
                                        </div>
                                    </div>
                                    <Field
                                        type="input"
                                        name="apartment"
                                        css={[styles.input]}
                                        placeholder="Apartment, suite, etc. (optional)"
                                    />
                                </div>
                                <div tw='mt-16 w-full flex justify-end'>
                                    <button
                                        type='submit'
                                        css={[buttons.red, tw`px-[30px] h-[52px]`]}
                                    // onClick={() => !validateForm() && setPage(1)}
                                    // disabled={validateInfo(values)}
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