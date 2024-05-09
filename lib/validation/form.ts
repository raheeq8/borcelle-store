import { z } from "zod";
// shippingAddress1,
//       shippingAddress2,
//       city,
//       zip,
//       country,
//       phone,
//       totalPrice,
//       user,
export const formSchema = z.object({
  fName: z.string().min(1, {
    message: "First Name is required",
  }),
  lName: z.string().min(1, {
    message: "Last Name is required",
  }),
  
  shippingAddress1: z.string().min(1, {
    message: "Address is required",
  }),
  shippingAddress2: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required",
  }),
  country: z.string({message: "This field is required"}),
  // province: z.string().min(1, {
  //   message: "Province is required",
  // }),
  zip: z.string().min(1, {
    message: "Postal is required",
  }),
  phone: z.string(),
});
