"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCart from "@/lib/useHook";
import { Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { formSchema } from "@/lib/validation/form";

const page = () => {
  const { user } = useUser();
  const router = useRouter();
  const cart = useCart();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      country: "",
      fName: "",
      lName: "",
      province: "",
      city: "",
      zip: "",
      address: "",
    },
  });
  const subTtotal = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const subTotalRounded = parseFloat(subTtotal.toFixed(2));
  const total = subTotalRounded + 150;
  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(
          `http://localhost:3001/api/order`,
          {
            method: "POST",
            body: JSON.stringify(values)
          },
        );
        const data = await res.json();
        console.log(data);
        // const res = await axios.post(`/${process.env.NEXT_PUBLIC_API_URL}/placeorder`, values, );
        // const data = await res.data
        // console.log(data);
      }
    } catch (error) {
      console.log("[checkout_POST]", error);
    }
  }


  const handleCheckout = async () => {};
  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/4 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Country/Region  */}
            <div className="grid grid-cols-1 gap-3 pt-8 pb-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="text-sm !text-[#9D9D9D] rounded-md border-[1.5px] border-[#EFEFEF]"
                            placeholder="Country/Region"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pakistan">Pakistan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* First Name and Last Name  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
              <FormField
                control={form.control}
                name="fName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="First name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="Last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Company and Address  */}
            <div className="grid grid-cols-1 gap-3 pb-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="Company (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* City, Province and Postal Code  */}
            <div className="grid grid-cols-3 gap-3 pb-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="Province"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="Postal code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone  */}
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="border mt-4 rounded-lg text-body-bold text-white bg-black
            py-3 w-full hover:bg-white hover:text-black"
            >
              Place Order
            </Button>
          </form>
        </Form>
      </div>
      {cart.cartItems.length === 0 ? (
        <p className="w-1/2 max-lg:w-full bg-[#F5F5F5] flex items-center justify-center text-body-bold">
          No items to display
        </p>
      ) : (
        <div className="w-1/2 max-lg:w-full bg-[#F5F5F5] flex flex-col bg-grey-1 rounded-lg px-4 py-5">
          <div>
            {cart.cartItems.map((cartItem) => (
              <div className="flex  relative items-center justify-between w-full">
                <div className="flex items-center py-3 gap-4">
                  <div className="relative w-20 h-20 flex items-center justify-center bg-white border rounded-sm">
                    <Image
                      src={cartItem.item.media[0]}
                      alt="productImg"
                      width={60}
                      height={10}
                      priority
                    />
                    <span className="absolute -top-2 -right-2 bg-[#666666] text-white font-medium text-sm rounded-full w-6 h-6 flex items-center justify-center">
                      {cartItem.quantity}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-black text-md font-medium">
                      {cartItem.item.title}
                    </h2>
                    <h3 className="text-[#666] text-sm font-normal">
                      {cartItem.color} / Size: {cartItem.size}
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="text-black text-md font-medium text-right">
                    {cartItem.item.price}
                  </h3>
                </div>
                <span className="absolute top-2 -right-2 font-medium text-sm rounded-full w-6 h-6 flex items-center justify-center">
                  <Trash2
                    onClick={() => cart.removeItem(cartItem.item._id)}
                    className="h-4  w-4 -200 hover:text-red-500 hover:cursor-pointer"
                  />
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-body-semibold my-3">
            <span>Sub Total</span>
            <span>{subTotalRounded}</span>
          </div>
          <div className="flex justify-between text-body-semibold my-3">
            <span>Delivery Charges</span>
            <span>150</span>
          </div>
          <div className="flex justify-between text-body-semibold my-3">
            <span className=" text-bold">Total Amount</span>
            <span>{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
