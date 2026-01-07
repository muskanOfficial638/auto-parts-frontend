import { Suspense } from "react";
type OrderCreateProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddNewAddress({ closeModal }: OrderCreateProps) {

  function handleClose() {
    closeModal(false);
  } 
  return (

      <Suspense fallback={<div>Loading...</div>}>
            <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
          <div className="w-[700px] relative  max-w-[100%] bg-brandBlack rounded-sm md:px-[40px] px-[20px]  md:py-[50px] py-[30px]">
                <button onClick={handleClose}
                  className="absolute top-[15px] font-bold  right-[15px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
                >
                  <span className="text-black">✕</span>
                </button>
                <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
                  <h2 className="md:text-[22px] text-lg leading-[44px] font-semibold text-white mb-[30px]">
                    Add New Address
                  </h2>
                  <form className="space-y-[25px]">
                    <div>
                      <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Address
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div className="flex justify md:flex-row flex-col between gap-[30px]">
                      <div className="w-full">
                        <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                          City
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                          Province
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify md:flex-row flex-col between gap-[30px]">
                      <div className="w-full">
                        <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                           Postal Code
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                          Country
                        </label>
                        <select                       
                          className="w-full py-[11px] px-[18px] bg-white  text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                        >
                          <option>
                            South Africa (ZA)
                          </option>                        
                              <option>
                                 South Africa (ZA)
                              </option>
                      
                        </select>
                      </div>
                    </div>
                    {/* Save Button */}
                  <button
                    type="submit"
                    className="bg-autoblue  md:text-[18px] text-white text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                  >
                    Save Address
                  </button>
                  </form>
                </div>
              </div>
            </div>
      </Suspense>
    
  );
}
