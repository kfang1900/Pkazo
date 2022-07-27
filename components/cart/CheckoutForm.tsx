import { useState, useMemo } from 'react';
import Image from 'next/image';
import tw from 'twin.macro'
import { Formik, Form, Field } from 'formik';

import Dropdown from 'styles/Dropdown';
import buttons from 'styles/Button';
import countryList from 'react-select-country-list';

interface CheckoutValues {
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    company: string;
    address: string;
    apartment: string;
}

const CheckoutForm = (
    { country }: {
        country: string;
    }
) => {

    const [selectedCountry, setSelectedCountry] = useState(country || '');
    const countries = useMemo(() => countryList().getLabels(), []);

    const pages = ['Information', 'Shipping', 'Payment'];
    const [page, setPage] = useState(0);
    const styles = {
        label: tw`text-[#333333] text-[22px] font-bold`,
        input: tw`border border-[#D9D9D9] focus:border-[#888888] outline-none rounded-[6px] w-full h-12 px-4`
    }
    return <div tw='max-w-[572px] w-full'>
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
        <div tw='mt-16 mb-[100px]'>
            <Formik<CheckoutValues>
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    country: country,
                    company: '',
                    address: '',
                    apartment: ''
                }}
                validateOnChange={false}
                validate={() => { 0 }}
                onSubmit={() => { 0 }}
            >
                {({ values }) => (
                    <Form>
                        <div css={[styles.label]}>Contact Information</div>
                        <Field
                            type="input"
                            name="email"
                            css={[styles.input, tw`mt-6`]}
                            placeholder="Email"
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
                                css={[buttons.red, tw`px-[30px] h-[52px] ml-auto`]}
                            >
                                Continue to Shipping
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
}
export default CheckoutForm;