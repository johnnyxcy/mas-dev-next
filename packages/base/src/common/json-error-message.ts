/*
 * File: @mas/base/src/common/json-error-message.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 04:28 pm
 *
 * Last Modified: 10/27/2023 05:04 pm
 *
 * Modified By: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * Copyright (c) 2023 Maspectra Dev Team
 */
import nls from "@mas/i18n";

import { ParseErrorCode } from "@mas/base/common/json";

export function getParseErrorMessage(errorCode: ParseErrorCode): string {
    switch (errorCode) {
        case ParseErrorCode.InvalidSymbol:
            return nls.localizeByDefault("Invalid symbol");
        case ParseErrorCode.InvalidNumberFormat:
            return nls.localizeByDefault("Invalid number format");
        case ParseErrorCode.PropertyNameExpected:
            return nls.localizeByDefault("Property name expected");
        case ParseErrorCode.ValueExpected:
            return nls.localizeByDefault("Value expected");
        case ParseErrorCode.ColonExpected:
            return nls.localizeByDefault("Colon expected");
        case ParseErrorCode.CommaExpected:
            return nls.localizeByDefault("Comma expected");
        case ParseErrorCode.CloseBraceExpected:
            return nls.localizeByDefault("Closing brace expected");
        case ParseErrorCode.CloseBracketExpected:
            return nls.localizeByDefault("Closing bracket expected");
        case ParseErrorCode.EndOfFileExpected:
            return nls.localizeByDefault("End of file expected");
        default:
            return "";
    }
}
