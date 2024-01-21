import { createConnectTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@connectrpc/connect";
import type { PromiseClient, Transport } from "@connectrpc/connect";
import { BznsProService } from "@buf/ahmeddarwish_bzns-pro-api.connectrpc_es/bznspro/v1/bzns_pro_service_connect"
import { type Interceptor } from "@connectrpc/connect";
import type { ApiFormError } from "v-dashkit/types";

const interceptor: Interceptor = (next) => async (req) => {
    try {
        const token = localStorage.getItem("token") as string
        req.header.append("Authorization", `bearer ${token}`)
        const response = await next(req);
        return response
    } catch (error: any) {
        const err: ApiFormError = {
            globalErrors: [],
            fieldErrors: {}
        }
        if (error.code == 6) {
            err.fieldErrors[error.rawMessage] = `${error.rawMessage}Unique`
            console.log("field error")
            throw new Error(JSON.stringify(err));
        }

        if (error.code == 13) {
            err.globalErrors = [`${error.rawMessage}`]
            throw new Error(JSON.stringify(err));
        }


        console.log("devig ", error)
        // err.fieldErrors[0] = 'unhandled'
        throw new Error(JSON.stringify(err));
    }
}

const transport = createConnectTransport({
    baseUrl: import.meta.env.VITE_API_URL,
    useHttpGet: true,
    interceptors: [interceptor]
});

const apiClient: PromiseClient<typeof BznsProService> = createPromiseClient(BznsProService, transport as Transport);



export default apiClient
