/*
 * File: @mas/base/src/common/json-error-message.ts
 *
 * Author: Johnny Xu <johnny.xcy1997@outlook.com>
 *
 * File Created: 09/26/2023 04:28 pm
 *
 * Last Modified: 09/26/2023 05:12 pm
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
            return nls.localize("error.invalidSymbol", "Invalid symbol");
        case ParseErrorCode.InvalidNumberFormat:
            return nls.localize("error.invalidNumberFormat", "Invalid number format");
        case ParseErrorCode.PropertyNameExpected:
            return nls.localize("error.propertyNameExpected", "Property name expected");
        case ParseErrorCode.ValueExpected:
            return nls.localize("error.valueExpected", "Value expected");
        case ParseErrorCode.ColonExpected:
            return nls.localize("error.colonExpected", "Colon expected");
        case ParseErrorCode.CommaExpected:
            return nls.localize("error.commaExpected", "Comma expected");
        case ParseErrorCode.CloseBraceExpected:
            return nls.localize("error.closeBraceExpected", "Closing brace expected");
        case ParseErrorCode.CloseBracketExpected:
            return nls.localize("error.closeBracketExpected", "Closing bracket expected");
        case ParseErrorCode.EndOfFileExpected:
            return nls.localize("error.endOfFileExpected", "End of file expected");
        default:
            return "";
    }
}
