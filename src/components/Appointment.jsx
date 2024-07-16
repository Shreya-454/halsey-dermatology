"use client"
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Checked, DropArrow } from './common/Icon';

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex gap-[13px] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`max-w-[18px] w-full relative h-[18px] inline-block border rounded-[2px] bg-transparent transition-all ${
          checked ? 'border-transparent' : ' border-2 border-fade-green'
        }`}
      >
        {checked && (
          <div className='absolute inset-0'>
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0.5H2C1.46957 0.5 0.960859 0.710714 0.585786 1.08579C0.210714 1.46086 0 1.96957 0 2.5V16.5C0 17.0304 0.210714 17.5391 0.585786 17.9142C0.960859 18.2893 1.46957 18.5 2 18.5H16C16.5304 18.5 17.0391 18.2893 17.4142 17.9142C17.7893 17.5391 18 17.0304 18 16.5V2.5C18 1.96957 17.7893 1.46086 17.4142 1.08579C17.0391 0.710714 16.5304 0.5 16 0.5ZM16 2.5V16.5H2V2.5H16ZM7 14.5L3 10.5L4.41 9.08L7 11.67L13.59 5.08L15 6.5" fill="#6E9277"/>
            </svg>
          </div>
        )}
      </span>
      {label && <span className='text-sm font-archivo text-dark-black text-opacity-70 leading-normal'>{label}</span>}
    </label>
  );
};

export default function Appointment() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const customDropdownRef = useRef(null);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSelectOption = (option) => {
    setActiveOption(option);
    setMenuOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (customDropdownRef.current && !customDropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  const [isChecked, setIsChecked] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const onSubmit = (data) => {
    console.log(data);
    setFormSubmitted(true);
    reset();
    const timer = setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  return (
    <div>
      <div className="container max-w-[1172px] px-4 mx-auto pt-[51px] pb-[58px]">
        <div className="flex lg:flex-row flex-col-reverse flex-wrap -mx-3 items-center">
          <div className="lg:w-1/2 w-full px-3">
            <h3 className=" font-kaushan text-custom_3xl text-fade-green italic inline-block leading-145 relative after:bg-fade-green after:h-[2px] after:absolute after:top-[50%] after:-right-[47%] after:w-[60px] mb-2.5">Appointment</h3>
            <h1 className=" font-archivo text-dark-black text-5xl font-semibold leading-130 mb-[15px] uppercase max-lg:text-center">Book Your<span className='block'> Appointment Now</span></h1>
            <p className="text-base leading-normal font-archivo text-dark-grey lg:max-w-[508px] mb-6">Have questions or ready to schedule your appointment? Reach out to our friendly team today.<span><a href="#" className="text-fade-green"> Click here to Instantly Book Online</a></span></p>
            {formSubmitted && (
              <div className="mb-4 p-4 text-green-700 bg-green-200 border border-green-400 rounded">
                Thank you! Your appointment request has been submitted successfully.
              </div>
            )}
            <form className='lg:max-w-[545px] w-full' onSubmit={handleSubmit(onSubmit)}>
              <div className=' w-full flex gap-[15px] mb-3.5'>
                <div className="relative w-1/2 ">
                  <input
                    type="text"
                    placeholder='First Name'
                    {...register("firstName", { required: "First Name is required" })}
                    className={`font-archivo w-full text-grey border ${errors.firstName ? 'border-red-500' : 'border-light-grey'} text-opacity-70 bg-off-white text-base font-normal px-3.5 focus:outline-none py-[13px] w-full`}
                  />
                  {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
                </div>
                <div className="relative w-1/2 ">
                  <input
                    type="text"
                    placeholder='Last Name'
                    {...register("lastName", { required: "Last Name is required" })}
                    className={`font-archivo text-grey border ${errors.lastName ? 'border-red-500' : 'border-light-grey'} text-opacity-70 bg-off-white text-base font-normal px-3.5 focus:outline-none py-[13px] w-full`}
                  />
                  {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
                </div>
              </div>
              <div className="relative text-left mb-3.5" ref={dropdownRef}>
                <div>
                  <button
                    type="button"
                    className="flex items-center justify-between w-full border border-light-grey font-archivo px-3.5 py-[13px] text-opacity-70 bg-off-white text-base text-grey focus:outline-none"
                    id="options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    {selectedOption || 'Secure Message'}
                    <DropArrow/>
                  </button>
                </div>
                {isOpen && (
                  <div
                    className="origin-top-right absolute left-0 duration-300 w-full bg-white shadow-dropdown p-[15px] pb-0 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="pb-[15px] w-full" role="none">
                      {['Phone Call', 'Secure Message'].map((option) => (
                        <label
                          key={option}
                          className="flex items-center px-3.5 py-[13px] text-base text-grey text-opacity-70 font-archivo"
                        >
                          <input
                            type="radio"
                            className="hidden"
                            name="dropdown-option"
                            checked={selectedOption === option}
                            onChange={() => handleOptionClick(option)}
                          />
                          <span
                            className={`mr-3 flex justify-center items-center w-[18px] h-[18px] `}
                          >
                            {selectedOption === option ? (
                              <Checked/>
                            ):(<Box/>)}
                          </span>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='w-full mb-3.5'>
                <textarea
                  placeholder='Message'
                  {...register("message", { required: "Message is required" })}
                  className={`font-archivo resize-none h-[77px]  text-grey border ${errors.message ? 'border-red-500' : 'border-light-grey'} text-opacity-70 bg-off-white text-base font-normal px-3.5 focus:outline-none py-[13px] w-full`}
                ></textarea>
                 {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
              </div>
              <div className="relative text-left" ref={customDropdownRef}>
                <div className='mb-3.5'>
                  <button
                    type="button"
                    className="flex justify-between w-full border border-light-grey px-3.5 py-[13px] items-center bg-off-white text-base text-grey text-opacity-70 font-archivo focus:outline-none"
                    id="custom-options-menu"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleToggleMenu}
                  >
                    {activeOption || 'Appointment'}
                    <DropArrow/>
                  </button>
                </div>
                {menuOpen && (
                  <div
                    className="origin-top-right absolute left-0 w-full shadow-dropdown bg-white focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="custom-options-menu"
                  >
                    <div className="pb-[15px] w-full" role="none">
                      {['Appointment', 'More Information'].map((option) => (
                        <label
                          key={option}
                          className="flex items-center px-3.5 py-[13px] text-base text-grey text-opacity-70 font-archivo"
                        >
                          <input
                            type="radio"
                            className="hidden"
                            name="custom-dropdown-option"
                            checked={activeOption === option}
                            onChange={() => handleSelectOption(option)}
                          />
                          <span
                            className={`bg-transparent mr-3 flex justify-center items-center`}
                          >
                            {activeOption === option ? (
                              <Checked/>
                            ) : (
                              <Box/>
                            )}
                          </span>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <textarea
                name="comments"
                placeholder='Comments/Information Requested'
                {...register("comments", { required: "Comments are required" })}
                className={`text-base font-archivo text-grey text-opacity-70 w-full border ${errors.comments ? 'border-red-500' : 'border-light-grey'} bg-off-white resize-none h-[106px] py-[13px] px-3.5 focus:outline-none`}
              ></textarea>
              {errors.comments && <span className="text-red-500 text-sm">{errors.comments.message}</span>}
              <div className='bg-light-green py-[9.5px] pl-[15px] mt-[18px] mb-10'>
                <CustomCheckbox
                  label=' "I hereby request to be contacted for the purpose of obtaining general marketing information about the devices / treatments listed above.  I acknowledge that this information is not medical advice, and that any patient-specific advice or informed consent shall only be obtained at a visit with a qualified professional (MD/PA-C) on our staff."'
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </div>
              <button type='submit' className='font-archivo hover:text-fade-green hover:bg-transparent border-2 border-transparent hover:border-fade-green duration-300 text-lg leading-108 py-[15px] px-[25px] text-white bg-fade-green uppercase font-medium'>Contact Us</button>
            </form>
          </div>
          <div className="lg:w-1/2 px-3 w-full flex lg:justify-end justify-center">
            <Image src="/assets/images/webp/contact.webp" alt='contact' width={546} height={769}/>
          </div>
        </div>
      </div>
    </div>
  );
}
