import { Controller, Get, StreamableFile, Response, NotFoundException } from "@nestjs/common";
import { Response as ExpressResponse } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import configuration from "../../core/config/configuration";
import { Prefix } from "../../core/enums";
import { CommonErrors } from "../../core/responses";

@Controller(Prefix.COMMON)
export class CommonController {
    @Get("errors")
    getErrorFile(@Response({ passthrough: true }) res: ExpressResponse): StreamableFile {
        try {
            const file = createReadStream(join(process.cwd(), `${configuration().logs.fileName}.json`));
            res.set({
                "Content-Type": "application/json",
                // eslint-disable-next-line prettier/prettier
                "Content-Disposition": `attachment; filename="${configuration().logs.fileName}.json"`,
            });
            return new StreamableFile(file);
        } catch (e) {
            throw new NotFoundException(CommonErrors.E_404_FILE_NOT_EXIST);
        }
    }
}
