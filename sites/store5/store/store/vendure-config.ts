import { VendureConfig } from "@vendure/core";
import {
  PaymentMethodHandler,
  CreatePaymentResult,
  SettlePaymentResult,
  LanguageCode,
} from "@vendure/core";

export const config: VendureConfig = {
  apiOptions: {
    port: 4001,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    cookieOptions: {
      secret: process.env.SESSION_SECRET || "secret-key",
    },
  },
  dbConnectionOptions: {
    type: "sqlite",
    database: "./vendure.sqlite",
    synchronize: false, // only for development
    logging: false,
  },
  paymentOptions: {
    paymentMethodHandlers: [
      new PaymentMethodHandler({
        code: "example-payment",
        description: [
          {
            languageCode: LanguageCode.en,
            value: "Example Payment Method",
          },
        ],
        args: {
          apiKey: { type: "string" },
        },
        createPayment: async (
          ctx,
          order,
          amount,
          args,
          metadata
        ): Promise<CreatePaymentResult> => {
          // Implement payment creation logic here
          return {
            amount,
            state: "Settled" as const,
            transactionId: "txn_123456",
            metadata: {},
          };
        },
        settlePayment: async (
          ctx,
          order,
          payment,
          args
        ): Promise<SettlePaymentResult> => {
          // Implement payment settlement logic here
          return { success: true };
        },
      }),
    ],
  },
};
