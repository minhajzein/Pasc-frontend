import React from "react";
import { useSelector } from "react-redux";
import GooglePayButton from "@google-pay/button-react";

//============== imports ======================================================================================================

const PendingPayment = () => {
	const user = useSelector(state => state.user.value);

	return (
		<div className="bg-blue-300 p-7 shadow-2xl shadow-black rounded-lg pb-20 flex duration-300 w-[90%] md:w-[70%] lg:w-[50%] justify-center items-center flex-col">
			<h1 className="text-center font-black text-xs sm:text-sm md:text-md lg:text-lg uppercase text-blue-800">
				Complete Payment
			</h1>
			<p className="mt-4 text-xs sm:text-sm md:text-md lg:text-lg">
				Dear, <span className="font-bold">{user.username}</span> you are eligible
				for pasc membership, But you have to complete payment to get membership.
				Membership fee is{" "}
				<span className="font-bold">five hundred rupees (500.rs).</span> Please
				complete your payment.!
			</p>
			<div className="hover:scale-105 duration-300 mt-10">
				<GooglePayButton
					environment="PRODUCTION"
					buttonSizeMode="fill"
					buttonType="pay"
					paymentRequest={{
						apiVersion: 2,
						apiVersionMinor: 0,
						allowedPaymentMethods: [
							{
								type: "CARD",
								parameters: {
									allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
									allowedCardNetworks: ["MASTERCARD", "VISA"],
								},
								tokenizationSpecification: {
									type: "PAYMENT_GATEWAY",
									parameters: {
										gateway: "example",
										gatewayMerchantId: "BCR2DN4T52CIJWCP",
									},
								},
							},
						],
						merchantInfo: {
							merchantId: "BCR2DN4T52CIJWCP",
							merchantName: "Demo Merchant",
						},
						transactionInfo: {
							totalPriceStatus: "FINAL",
							totalPriceLabel: "Total",
							totalPrice: "500.00",
							currencyCode: "INR",
							countryCode: "IN",
						},
					}}
					onLoadPaymentData={paymentRequest => {
						console.log("load payment data", paymentRequest);
					}}
				/>
			</div>
			<hr className="mt-7 border border-gray-500 w-full" />
			<div className="w-full h-10 md:h-16 flex justify-around mt-6">
				<img
					className="h-full object-contain hover:scale-105 duration-300 cursor-not-allowed rounded-full"
					src="/images/paypal.png"
					alt=""
				/>
				<img
					className="h-full object-contain hover:scale-105 duration-300 cursor-not-allowed rounded-full"
					src="/images/download.png"
					alt=""
				/>
				<img
					className="h-full object-contain hover:scale-105 duration-300 cursor-not-allowed rounded-full"
					src="/images/Paytm.jpg"
					alt=""
				/>
			</div>
		</div>
	);
};

export default PendingPayment;
