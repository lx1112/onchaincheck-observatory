// Built from a private repository (agent-data-api scripts/pm-record.ts). Do not edit.
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};

// node_modules/abitype/dist/esm/version.js
var version;
var init_version = __esm({
  "node_modules/abitype/dist/esm/version.js"() {
    version = "1.2.3";
  }
});

// node_modules/abitype/dist/esm/errors.js
var BaseError;
var init_errors = __esm({
  "node_modules/abitype/dist/esm/errors.js"() {
    init_version();
    BaseError = class _BaseError extends Error {
      constructor(shortMessage, args2 = {}) {
        const details = args2.cause instanceof _BaseError ? args2.cause.details : args2.cause?.message ? args2.cause.message : args2.details;
        const docsPath = args2.cause instanceof _BaseError ? args2.cause.docsPath || args2.docsPath : args2.docsPath;
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args2.metaMessages ? [...args2.metaMessages, ""] : [],
          ...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
          ...details ? [`Details: ${details}`] : [],
          `Version: abitype@${version}`
        ].join("\n");
        super(message);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiTypeError"
        });
        if (args2.cause)
          this.cause = args2.cause;
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args2.metaMessages;
        this.shortMessage = shortMessage;
      }
    };
  }
});

// node_modules/abitype/dist/esm/regex.js
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
var bytesRegex, integerRegex, isTupleRegex;
var init_regex = __esm({
  "node_modules/abitype/dist/esm/regex.js"() {
    bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
    integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
    isTupleRegex = /^\(.+?\).*?$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/signatures.js
function isErrorSignature(signature) {
  return errorSignatureRegex.test(signature);
}
function execErrorSignature(signature) {
  return execTyped(errorSignatureRegex, signature);
}
function isEventSignature(signature) {
  return eventSignatureRegex.test(signature);
}
function execEventSignature(signature) {
  return execTyped(eventSignatureRegex, signature);
}
function isFunctionSignature(signature) {
  return functionSignatureRegex.test(signature);
}
function execFunctionSignature(signature) {
  return execTyped(functionSignatureRegex, signature);
}
function isStructSignature(signature) {
  return structSignatureRegex.test(signature);
}
function execStructSignature(signature) {
  return execTyped(structSignatureRegex, signature);
}
function isConstructorSignature(signature) {
  return constructorSignatureRegex.test(signature);
}
function execConstructorSignature(signature) {
  return execTyped(constructorSignatureRegex, signature);
}
function isFallbackSignature(signature) {
  return fallbackSignatureRegex.test(signature);
}
function execFallbackSignature(signature) {
  return execTyped(fallbackSignatureRegex, signature);
}
function isReceiveSignature(signature) {
  return receiveSignatureRegex.test(signature);
}
var errorSignatureRegex, eventSignatureRegex, functionSignatureRegex, structSignatureRegex, constructorSignatureRegex, fallbackSignatureRegex, receiveSignatureRegex, eventModifiers, functionModifiers;
var init_signatures = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/signatures.js"() {
    init_regex();
    errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
    structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
    constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
    fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
    receiveSignatureRegex = /^receive\(\) external payable$/;
    eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
    functionModifiers = /* @__PURE__ */ new Set([
      "calldata",
      "memory",
      "storage"
    ]);
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/abiItem.js
var UnknownTypeError, UnknownSolidityTypeError;
var init_abiItem = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/abiItem.js"() {
    init_errors();
    UnknownTypeError = class extends BaseError {
      constructor({ type }) {
        super("Unknown type.", {
          metaMessages: [
            `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownTypeError"
        });
      }
    };
    UnknownSolidityTypeError = class extends BaseError {
      constructor({ type }) {
        super("Unknown type.", {
          metaMessages: [`Type "${type}" is not a valid ABI type.`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownSolidityTypeError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js
var InvalidParameterError, SolidityProtectedKeywordError, InvalidModifierError, InvalidFunctionModifierError, InvalidAbiTypeParameterError;
var init_abiParameter = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js"() {
    init_errors();
    InvalidParameterError = class extends BaseError {
      constructor({ param }) {
        super("Invalid ABI parameter.", {
          details: param
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParameterError"
        });
      }
    };
    SolidityProtectedKeywordError = class extends BaseError {
      constructor({ param, name }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SolidityProtectedKeywordError"
        });
      }
    };
    InvalidModifierError = class extends BaseError {
      constructor({ param, type, modifier }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidModifierError"
        });
      }
    };
    InvalidFunctionModifierError = class extends BaseError {
      constructor({ param, type, modifier }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
            `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidFunctionModifierError"
        });
      }
    };
    InvalidAbiTypeParameterError = class extends BaseError {
      constructor({ abiParameter }) {
        super("Invalid ABI parameter.", {
          details: JSON.stringify(abiParameter, null, 2),
          metaMessages: ["ABI parameter type is invalid."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiTypeParameterError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/signature.js
var InvalidSignatureError, UnknownSignatureError, InvalidStructSignatureError;
var init_signature = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/signature.js"() {
    init_errors();
    InvalidSignatureError = class extends BaseError {
      constructor({ signature, type }) {
        super(`Invalid ${type} signature.`, {
          details: signature
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidSignatureError"
        });
      }
    };
    UnknownSignatureError = class extends BaseError {
      constructor({ signature }) {
        super("Unknown signature.", {
          details: signature
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownSignatureError"
        });
      }
    };
    InvalidStructSignatureError = class extends BaseError {
      constructor({ signature }) {
        super("Invalid struct signature.", {
          details: signature,
          metaMessages: ["No properties exist."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidStructSignatureError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/struct.js
var CircularReferenceError;
var init_struct = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/struct.js"() {
    init_errors();
    CircularReferenceError = class extends BaseError {
      constructor({ type }) {
        super("Circular reference detected.", {
          metaMessages: [`Struct "${type}" is a circular reference.`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "CircularReferenceError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js
var InvalidParenthesisError;
var init_splitParameters = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js"() {
    init_errors();
    InvalidParenthesisError = class extends BaseError {
      constructor({ current, depth }) {
        super("Unbalanced parentheses.", {
          metaMessages: [
            `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
          ],
          details: `Depth "${depth}"`
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParenthesisError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/cache.js
function getParameterCacheKey(param, type, structs) {
  let structKey = "";
  if (structs)
    for (const struct of Object.entries(structs)) {
      if (!struct)
        continue;
      let propertyKey = "";
      for (const property of struct[1]) {
        propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
      }
      structKey += `(${struct[0]}{${propertyKey}})`;
    }
  if (type)
    return `${type}:${param}${structKey}`;
  return `${param}${structKey}`;
}
var parameterCache;
var init_cache = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/cache.js"() {
    parameterCache = /* @__PURE__ */ new Map([
      // Unnamed
      ["address", { type: "address" }],
      ["bool", { type: "bool" }],
      ["bytes", { type: "bytes" }],
      ["bytes32", { type: "bytes32" }],
      ["int", { type: "int256" }],
      ["int256", { type: "int256" }],
      ["string", { type: "string" }],
      ["uint", { type: "uint256" }],
      ["uint8", { type: "uint8" }],
      ["uint16", { type: "uint16" }],
      ["uint24", { type: "uint24" }],
      ["uint32", { type: "uint32" }],
      ["uint64", { type: "uint64" }],
      ["uint96", { type: "uint96" }],
      ["uint112", { type: "uint112" }],
      ["uint160", { type: "uint160" }],
      ["uint192", { type: "uint192" }],
      ["uint256", { type: "uint256" }],
      // Named
      ["address owner", { type: "address", name: "owner" }],
      ["address to", { type: "address", name: "to" }],
      ["bool approved", { type: "bool", name: "approved" }],
      ["bytes _data", { type: "bytes", name: "_data" }],
      ["bytes data", { type: "bytes", name: "data" }],
      ["bytes signature", { type: "bytes", name: "signature" }],
      ["bytes32 hash", { type: "bytes32", name: "hash" }],
      ["bytes32 r", { type: "bytes32", name: "r" }],
      ["bytes32 root", { type: "bytes32", name: "root" }],
      ["bytes32 s", { type: "bytes32", name: "s" }],
      ["string name", { type: "string", name: "name" }],
      ["string symbol", { type: "string", name: "symbol" }],
      ["string tokenURI", { type: "string", name: "tokenURI" }],
      ["uint tokenId", { type: "uint256", name: "tokenId" }],
      ["uint8 v", { type: "uint8", name: "v" }],
      ["uint256 balance", { type: "uint256", name: "balance" }],
      ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
      ["uint256 value", { type: "uint256", name: "value" }],
      // Indexed
      [
        "event:address indexed from",
        { type: "address", name: "from", indexed: true }
      ],
      ["event:address indexed to", { type: "address", name: "to", indexed: true }],
      [
        "event:uint indexed tokenId",
        { type: "uint256", name: "tokenId", indexed: true }
      ],
      [
        "event:uint256 indexed tokenId",
        { type: "uint256", name: "tokenId", indexed: true }
      ]
    ]);
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/utils.js
function parseSignature(signature, structs = {}) {
  if (isFunctionSignature(signature))
    return parseFunctionSignature(signature, structs);
  if (isEventSignature(signature))
    return parseEventSignature(signature, structs);
  if (isErrorSignature(signature))
    return parseErrorSignature(signature, structs);
  if (isConstructorSignature(signature))
    return parseConstructorSignature(signature, structs);
  if (isFallbackSignature(signature))
    return parseFallbackSignature(signature);
  if (isReceiveSignature(signature))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new UnknownSignatureError({ signature });
}
function parseFunctionSignature(signature, structs = {}) {
  const match = execFunctionSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "function" });
  const inputParams = splitParameters(match.parameters);
  const inputs = [];
  const inputLength = inputParams.length;
  for (let i = 0; i < inputLength; i++) {
    inputs.push(parseAbiParameter(inputParams[i], {
      modifiers: functionModifiers,
      structs,
      type: "function"
    }));
  }
  const outputs = [];
  if (match.returns) {
    const outputParams = splitParameters(match.returns);
    const outputLength = outputParams.length;
    for (let i = 0; i < outputLength; i++) {
      outputs.push(parseAbiParameter(outputParams[i], {
        modifiers: functionModifiers,
        structs,
        type: "function"
      }));
    }
  }
  return {
    name: match.name,
    type: "function",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs,
    outputs
  };
}
function parseEventSignature(signature, structs = {}) {
  const match = execEventSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "event" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], {
      modifiers: eventModifiers,
      structs,
      type: "event"
    }));
  return { name: match.name, type: "event", inputs: abiParameters };
}
function parseErrorSignature(signature, structs = {}) {
  const match = execErrorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "error" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "error" }));
  return { name: match.name, type: "error", inputs: abiParameters };
}
function parseConstructorSignature(signature, structs = {}) {
  const match = execConstructorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "constructor" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs: abiParameters
  };
}
function parseFallbackSignature(signature) {
  const match = execFallbackSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: match.stateMutability ?? "nonpayable"
  };
}
function parseAbiParameter(param, options) {
  const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey);
  const isTuple = isTupleRegex.test(param);
  const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
  if (!match)
    throw new InvalidParameterError({ param });
  if (match.name && isSolidityKeyword(match.name))
    throw new SolidityProtectedKeywordError({ param, name: match.name });
  const name = match.name ? { name: match.name } : {};
  const indexed = match.modifier === "indexed" ? { indexed: true } : {};
  const structs = options?.structs ?? {};
  let type;
  let components = {};
  if (isTuple) {
    type = "tuple";
    const params = splitParameters(match.type);
    const components_ = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      components_.push(parseAbiParameter(params[i], { structs }));
    }
    components = { components: components_ };
  } else if (match.type in structs) {
    type = "tuple";
    components = { components: structs[match.type] };
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`;
  } else if (match.type === "address payable") {
    type = "address";
  } else {
    type = match.type;
    if (!(options?.type === "struct") && !isSolidityType(type))
      throw new UnknownSolidityTypeError({ type });
  }
  if (match.modifier) {
    if (!options?.modifiers?.has?.(match.modifier))
      throw new InvalidModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
    if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
      throw new InvalidFunctionModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
  }
  const abiParameter = {
    type: `${type}${match.array ?? ""}`,
    ...name,
    ...indexed,
    ...components
  };
  parameterCache.set(parameterCacheKey, abiParameter);
  return abiParameter;
}
function splitParameters(params, result = [], current = "", depth = 0) {
  const length = params.trim().length;
  for (let i = 0; i < length; i++) {
    const char = params[i];
    const tail = params.slice(i + 1);
    switch (char) {
      case ",":
        return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
      case "(":
        return splitParameters(tail, result, `${current}${char}`, depth + 1);
      case ")":
        return splitParameters(tail, result, `${current}${char}`, depth - 1);
      default:
        return splitParameters(tail, result, `${current}${char}`, depth);
    }
  }
  if (current === "")
    return result;
  if (depth !== 0)
    throw new InvalidParenthesisError({ current, depth });
  result.push(current.trim());
  return result;
}
function isSolidityType(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex.test(type) || integerRegex.test(type);
}
function isSolidityKeyword(name) {
  return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex.test(name) || integerRegex.test(name) || protectedKeywordsRegex.test(name);
}
function isValidDataLocation(type, isArray) {
  return isArray || type === "bytes" || type === "string" || type === "tuple";
}
var abiParameterWithoutTupleRegex, abiParameterWithTupleRegex, dynamicIntegerRegex, protectedKeywordsRegex;
var init_utils = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/utils.js"() {
    init_regex();
    init_abiItem();
    init_abiParameter();
    init_signature();
    init_splitParameters();
    init_cache();
    init_signatures();
    abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
    abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
    dynamicIntegerRegex = /^u?int$/;
    protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/structs.js
function parseStructs(signatures) {
  const shallowStructs = {};
  const signaturesLength = signatures.length;
  for (let i = 0; i < signaturesLength; i++) {
    const signature = signatures[i];
    if (!isStructSignature(signature))
      continue;
    const match = execStructSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "struct" });
    const properties = match.properties.split(";");
    const components = [];
    const propertiesLength = properties.length;
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k];
      const trimmed = property.trim();
      if (!trimmed)
        continue;
      const abiParameter = parseAbiParameter(trimmed, {
        type: "struct"
      });
      components.push(abiParameter);
    }
    if (!components.length)
      throw new InvalidStructSignatureError({ signature });
    shallowStructs[match.name] = components;
  }
  const resolvedStructs = {};
  const entries = Object.entries(shallowStructs);
  const entriesLength = entries.length;
  for (let i = 0; i < entriesLength; i++) {
    const [name, parameters] = entries[i];
    resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
  }
  return resolvedStructs;
}
function resolveStructs(abiParameters = [], structs = {}, ancestors = /* @__PURE__ */ new Set()) {
  const components = [];
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    const isTuple = isTupleRegex.test(abiParameter.type);
    if (isTuple)
      components.push(abiParameter);
    else {
      const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
      if (!match?.type)
        throw new InvalidAbiTypeParameterError({ abiParameter });
      const { array, type } = match;
      if (type in structs) {
        if (ancestors.has(type))
          throw new CircularReferenceError({ type });
        components.push({
          ...abiParameter,
          type: `tuple${array ?? ""}`,
          components: resolveStructs(structs[type], structs, /* @__PURE__ */ new Set([...ancestors, type]))
        });
      } else {
        if (isSolidityType(type))
          components.push(abiParameter);
        else
          throw new UnknownTypeError({ type });
      }
    }
  }
  return components;
}
var typeWithoutTupleRegex;
var init_structs = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/structs.js"() {
    init_regex();
    init_abiItem();
    init_abiParameter();
    init_signature();
    init_struct();
    init_signatures();
    init_utils();
    typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/parseAbi.js
function parseAbi(signatures) {
  const structs = parseStructs(signatures);
  const abi = [];
  const length = signatures.length;
  for (let i = 0; i < length; i++) {
    const signature = signatures[i];
    if (isStructSignature(signature))
      continue;
    abi.push(parseSignature(signature, structs));
  }
  return abi;
}
var init_parseAbi = __esm({
  "node_modules/abitype/dist/esm/human-readable/parseAbi.js"() {
    init_signatures();
    init_structs();
    init_utils();
  }
});

// node_modules/abitype/dist/esm/exports/index.js
var init_exports = __esm({
  "node_modules/abitype/dist/esm/exports/index.js"() {
    init_parseAbi();
  }
});

// node_modules/viem/_esm/index.js
init_exports();

// src/polymarket/onchain.ts
var BALANCE_ABI = parseAbi(["function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])"]);

// src/polymarket/traders.ts
var DATA = "https://data-api.polymarket.com/v2";

// src/polymarket/markets.ts
var num = (v) => typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v !== "" && Number.isFinite(Number(v)) ? Number(v) : null;
var str = (v) => typeof v === "string" && v.trim() ? v.trim() : null;
var usd = (v) => v === null ? null : Math.round(v * 100) / 100;
var arr = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      const j = JSON.parse(v);
      return Array.isArray(j) ? j : [];
    } catch {
      return [];
    }
  }
  return [];
};
var data = (j) => j && typeof j === "object" && !Array.isArray(j) ? j.data : void 0;
function shapeMarket(m) {
  const conditionId = str(m.conditionId);
  if (!conditionId) return null;
  return {
    conditionId: conditionId.toLowerCase(),
    question: str(m.question),
    slug: str(m.slug),
    outcomes: arr(m.outcomes).map(String),
    prices: arr(m.outcomePrices).map(num),
    tokenIds: arr(m.clobTokenIds).map(String),
    endDate: str(m.endDate),
    volumeUsd: usd(num(m.volume)),
    closed: m.closed === true
  };
}
function sideHolders(rows, market, limit) {
  const lists = Array.isArray(data(rows)) ? data(rows) : [];
  return market.outcomes.map((outcome, i) => {
    const list = lists.find((l) => String(l.token_id) === market.tokenIds[i]) ?? lists.find((l) => l.holders?.[0]?.outcome_index === i);
    const price = market.prices[i] ?? null;
    const holders = (list?.holders ?? []).map((h) => {
      const shares = num(h.amount) ?? 0;
      const raw = str(h.name);
      const name = h.display_username_public === false || !raw || /^0x[0-9a-f]{40}-\d+$/i.test(raw) ? str(h.pseudonym) : raw;
      return { wallet: String(h.proxy_wallet ?? "").toLowerCase(), name, shares: Math.round(shares * 100) / 100, valueUsd: price === null ? null : usd(shares * price) };
    }).filter((h) => /^0x[0-9a-f]{40}$/.test(h.wallet)).sort((a, b) => b.shares - a.shares).slice(0, limit);
    return { outcome, price, holders };
  });
}
function busiestMarkets(events, n) {
  const out = [];
  for (const e of Array.isArray(events) ? events : []) {
    for (const raw of Array.isArray(e.markets) ? e.markets : []) {
      if (raw.closed === true || raw.active === false) continue;
      const m = shapeMarket(raw);
      if (!m || m.tokenIds.length !== m.outcomes.length || !m.outcomes.length) continue;
      out.push({ ...m, eventSlug: str(e.slug), volume24hUsd: Math.round(num(raw.volume24hr) ?? 0) });
    }
  }
  return out.sort((a, b) => b.volume24hUsd - a.volume24hUsd).slice(0, n);
}

// src/history/insert-sql.ts
var lit = (v) => v === null ? "NULL" : typeof v === "number" ? Number.isFinite(v) ? String(v) : "NULL" : `'${v.replace(/'/g, "''")}'`;
function insertSql(table, cols, rows, tail, per = 200) {
  const out = [];
  for (let i = 0; i < rows.length; i += per) {
    const values = rows.slice(i, i + per).map((r) => `(${cols.map((c) => lit(r[c] ?? null)).join(",")})`).join(",\n");
    out.push(`INSERT INTO ${table} (${cols.join(",")}) VALUES
${values}
${tail};`);
  }
  return out;
}

// src/polymarket/flow.ts
var num2 = (v) => typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v !== "" && Number.isFinite(Number(v)) ? Number(v) : null;
var str2 = (v) => typeof v === "string" && v.trim() ? v.trim() : null;
function shapeTrades(body) {
  const rows = Array.isArray(body?.data) ? body.data : [];
  const out = [];
  for (const t of rows) {
    const size = num2(t.size);
    const price = num2(t.price);
    const at = num2(t.timestamp);
    const wallet = String(t.proxy_wallet ?? "").toLowerCase();
    const side = str2(t.side)?.toUpperCase();
    if (size === null || price === null || at === null || !/^0x[0-9a-f]{40}$/.test(wallet) || side !== "BUY" && side !== "SELL") continue;
    const raw = str2(t.name);
    out.push({
      at,
      wallet,
      // Unnamed accounts carry "<wallet>-<timestamp>" as their name; show the pseudonym instead (as markets.ts does).
      name: !raw || /^0x[0-9a-f]{40}-\d+$/i.test(raw) ? str2(t.pseudonym) : raw,
      side,
      outcome: str2(t.outcome) ?? String(t.outcome_index ?? "?"),
      market: str2(t.title) ?? "",
      slug: str2(t.slug),
      eventSlug: str2(t.event_slug),
      usd: Math.round(size * price * 100) / 100,
      price,
      tx: str2(t.transaction_hash)
    });
  }
  return out;
}

// src/polymarket/history.ts
var num3 = (v) => typeof v === "number" && Number.isFinite(v) ? v : typeof v === "string" && v !== "" && Number.isFinite(Number(v)) ? Number(v) : null;
var str3 = (v) => typeof v === "string" && v.trim() ? v.trim() : null;
var r2 = (v) => Math.round(v * 100) / 100;
var BOARDS = [
  ["month", "overall", 100],
  ["all", "overall", 100],
  ["month", "crypto", 50]
];
var MARKET_SCOPES = [
  ["overall", 30],
  ["crypto", 10]
];
var BIG_TRADE_USD = 5e3;
function leaderMap(boards2) {
  const out = /* @__PURE__ */ new Map();
  for (const b of boards2) {
    for (const t of Array.isArray(b.rows) ? b.rows : []) {
      const wallet = String(t.user_id ?? "").toLowerCase();
      const rank = num3(t.rank);
      if (!/^0x[0-9a-f]{40}$/.test(wallet) || rank === null) continue;
      const cur = out.get(wallet) ?? { bestRank: rank, boards: [] };
      cur.bestRank = Math.min(cur.bestRank, rank);
      if (!cur.boards.includes(b.label)) cur.boards.push(b.label);
      out.set(wallet, cur);
    }
  }
  return out;
}
var marketRow = (m, ts) => ({
  condition_id: m.conditionId,
  question: m.question,
  slug: m.slug,
  event_slug: m.eventSlug,
  category: m.category,
  outcomes: JSON.stringify(m.outcomes),
  end_date: m.endDate,
  first_seen: ts,
  last_seen: ts
});
var MARKET_COLS = ["condition_id", "question", "slug", "event_slug", "category", "outcomes", "end_date", "first_seen", "last_seen"];
var marketSql = (rows) => insertSql("pm_markets", MARKET_COLS, rows, "ON CONFLICT (condition_id) DO UPDATE SET last_seen = excluded.last_seen, end_date = excluded.end_date", 100);
function holdingRows(m, holders, leaders2, ts) {
  const out = [];
  for (const side of sideHolders(holders, m, 100)) {
    for (const h of side.holders) {
      const l = leaders2.get(h.wallet);
      if (!l || !(h.shares > 0)) continue;
      out.push({ ts, condition_id: m.conditionId, outcome: side.outcome, wallet: h.wallet, shares: h.shares, price: side.price, value_usd: h.valueUsd, best_rank: l.bestRank, boards: l.boards.join(",") });
    }
  }
  return out;
}
var HOLDING_COLS = ["ts", "condition_id", "outcome", "wallet", "shares", "price", "value_usd", "best_rank", "boards"];
var holdingSql = (rows) => insertSql("pm_holdings", HOLDING_COLS, rows, "ON CONFLICT DO NOTHING", 200);
function bigTradeRows(conditionId, body, since2, minUsd = BIG_TRADE_USD) {
  const byKey = /* @__PURE__ */ new Map();
  for (const t of shapeTrades(body)) {
    if (!t.tx || t.at < since2) continue;
    const tx = t.tx.toLowerCase();
    const k = `${tx}|${t.wallet}|${t.outcome}|${t.side}`;
    const prev = byKey.get(k);
    if (prev) prev.usd = r2(prev.usd + t.usd);
    else byKey.set(k, { tx, condition_id: conditionId, wallet: t.wallet, outcome: t.outcome, side: t.side, usd: r2(t.usd), price: t.price, ts: t.at });
  }
  return [...byKey.values()].filter((r) => r.usd >= minUsd);
}
var TRADE_COLS = ["tx", "condition_id", "wallet", "outcome", "side", "usd", "price", "ts"];
var tradeSql = (rows) => insertSql("pm_big_trades", TRADE_COLS, rows, "ON CONFLICT DO NOTHING", 200);
var toCheckSql = (nowS, limit = 100) => `SELECT condition_id FROM pm_markets WHERE winner IS NULL AND (end_date < '${new Date(nowS * 1e3).toISOString()}' OR last_seen < ${nowS - 3 * 3600}) ORDER BY coalesce(checked_at, 0), last_seen LIMIT ${limit}`;
function winnerOf(m) {
  if (m.closed !== true) return null;
  const outcomes = parseList(m.outcomes);
  const prices = parseList(m.outcomePrices).map(num3);
  if (!outcomes.length || prices.length !== outcomes.length || prices.some((p) => p === null)) return null;
  const status = str3(m.umaResolutionStatus);
  if (status && status !== "resolved") return null;
  const closed = str3(m.closedTime);
  const resolvedAt = closed ? Math.floor(Date.parse(closed.replace(" ", "T").replace(/\+00$/, "Z")) / 1e3) : null;
  const at = resolvedAt !== null && Number.isFinite(resolvedAt) ? resolvedAt : null;
  const one = prices.findIndex((p) => p >= 0.99);
  if (one >= 0 && prices.every((p, i) => i === one || p <= 0.01)) return { winner: String(outcomes[one]), resolvedAt: at };
  if (prices.every((p) => Math.abs(p - 1 / prices.length) < 0.01)) return { winner: "50-50", resolvedAt: at };
  return null;
}
function parseList(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      const j = JSON.parse(v);
      return Array.isArray(j) ? j : [];
    } catch {
      return [];
    }
  }
  return [];
}
function resolutionSql(checked, found2, nowS) {
  const out = [...found2.entries()].map(([id, w]) => `UPDATE pm_markets SET winner = ${lit(w.winner)}, resolved_at = ${w.resolvedAt ?? nowS}, checked_at = ${nowS} WHERE condition_id = ${lit(id)};`);
  if (checked.length) out.push(`UPDATE pm_markets SET checked_at = ${nowS} WHERE condition_id IN (${checked.map(lit).join(",")});`);
  return out;
}

// scripts/lib/d1-any.ts
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// scripts/lib/d1.ts
import { execFileSync } from "node:child_process";
var TRANSIENT = /\b(7403|7429|7500)\b|ECONNRESET|ETIMEDOUT|fetch failed/;
var SQL_ERROR = /SQLITE_|no such (table|column)|syntax error/i;
function base({ db: db2 = "agent-data-history", mainnet = true }) {
  return ["wrangler", "d1", "execute", db2, ...mainnet ? ["--env", "mainnet"] : [], "--remote"];
}
function errorText(e) {
  const err = e;
  return `${err.stdout?.toString() ?? ""} ${err.stderr?.toString() ?? ""}`.replace(/\s+/g, " ").trim().slice(0, 600) || String(err.message ?? e);
}
function withRetries(target, run) {
  const attempts = target.attempts ?? 3;
  for (let attempt = 1; ; attempt++) {
    try {
      return run();
    } catch (e) {
      const text = errorText(e);
      if (attempt >= attempts || !TRANSIENT.test(text) || SQL_ERROR.test(text)) throw new Error(`wrangler d1 execute failed: ${text}`);
      console.error(`D1 attempt ${attempt} failed (${text.match(TRANSIENT)?.[0]}); retrying`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, target.waitMs ?? 2e4);
    }
  }
}
function d1Query(sql, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--json", "--command", sql], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 1 << 28
    });
    return JSON.parse(out.slice(out.search(/^\[/m)))[0].results;
  });
}
function d1File(file, target = {}) {
  return withRetries(target, () => {
    const out = execFileSync("npx", [...base(target), "--yes", "--file", file], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 });
    return out.match(/Executed[^\n]*/)?.[0] ?? out.slice(-300);
  });
}

// scripts/lib/d1-any.ts
function d1From(args2) {
  const testnet = args2.includes("--testnet");
  if (args2.includes("--d1") || testnet) {
    const target = testnet ? { db: "agent-data-testnet", mainnet: false } : { db: "agent-data-history" };
    return {
      query: async (sql) => d1Query(sql, target),
      exec: async (statements, label) => {
        if (!statements.length) return;
        const path = join(tmpdir(), `${label}-${Date.now()}.sql`);
        writeFileSync(path, statements.join("\n"));
        console.log(`${label}: ${d1File(path, target)}`);
      }
    };
  }
  const { CLOUDFLARE_API_TOKEN: token, CF_ACCOUNT_ID: account, D1_DATABASE_ID: database } = process.env;
  if (!(token && account && database)) throw new Error("CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID and D1_DATABASE_ID are required (or pass --d1/--testnet/--dry)");
  const url = `https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`;
  const run = async (sql) => {
    for (let attempt = 1; ; attempt++) {
      const r = await fetch(url, { method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ sql }) });
      const j = await r.json().catch(() => null);
      if (r.ok && j?.success) return j.result?.[0]?.results ?? [];
      if (attempt >= 3) throw new Error(`D1 ${r.status}: ${JSON.stringify(j?.errors ?? j).slice(0, 300)}`);
      await new Promise((ok) => setTimeout(ok, 5e3 * attempt));
    }
  };
  return {
    query: async (sql) => await run(sql),
    exec: async (statements) => {
      for (const sql of statements) await run(sql);
    }
  };
}

// scripts/pm-record.ts
var GAMMA = "https://gamma-api.polymarket.com";
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var HEADERS = { "user-agent": "onchaincheck.dev pm-record", accept: "application/json" };
var now = Math.floor(Date.now() / 1e3);
var pause = () => new Promise((ok) => setTimeout(ok, 250));
async function getJson(url) {
  for (let attempt = 1; ; attempt++) {
    const r = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(2e4) });
    if (r.ok) return r.json();
    if (attempt >= 3 || r.status !== 429 && r.status < 500) throw new Error(`${new URL(url).pathname} HTTP ${r.status}`);
    await new Promise((ok) => setTimeout(ok, 3e3 * attempt));
  }
}
var boards = [];
for (const [period, category, limit] of BOARDS) {
  const p = new URLSearchParams({ time_period: period, sort_by: "PNL", limit: String(limit) });
  if (category !== "overall") p.set("category", category);
  try {
    const j = await getJson(`${DATA}/leaderboard?${p}`);
    boards.push({ label: category === "overall" ? period : `${category}-${period}`, rows: Array.isArray(j?.data) ? j.data : j });
  } catch (e) {
    console.error(`pm-record: leaderboard ${period}/${category}: ${e}`);
  }
  await pause();
}
var leaders = leaderMap(boards);
if (leaders.size < 50) throw new Error(`only ${leaders.size} leaders read; not recording`);
var markets = [];
for (const [scope, n] of MARKET_SCOPES) {
  const p = new URLSearchParams({ limit: String(Math.max(15, n)), active: "true", closed: "false", order: "volume24hr", ascending: "false" });
  if (scope !== "overall") p.set("tag_slug", scope);
  try {
    for (const m of busiestMarkets(await getJson(`${GAMMA}/events?${p}`), n)) {
      if (!markets.some((x) => x.conditionId === m.conditionId)) markets.push({ ...m, category: scope });
    }
  } catch (e) {
    console.error(`pm-record: events ${scope}: ${e}`);
  }
  await pause();
}
if (!markets.length) throw new Error("no markets read; not recording");
var holdings = [];
var trades = [];
var holderFails = 0;
var tradeFails = 0;
var since = now - 3 * 3600;
for (const m of markets) {
  try {
    holdings.push(...holdingRows(m, await getJson(`${DATA}/holders?condition=${m.conditionId}&limit=100`), leaders, now));
  } catch (e) {
    holderFails++;
    console.error(`pm-record: holders ${m.slug}: ${e}`);
  }
  await pause();
  try {
    const p = new URLSearchParams({ condition: m.conditionId, limit: "300", filterType: "CASH", filterAmount: String(BIG_TRADE_USD) });
    trades.push(...bigTradeRows(m.conditionId, await getJson(`${DATA}/trades?${p}`), since));
  } catch (e) {
    tradeFails++;
    console.error(`pm-record: trades ${m.slug}: ${e}`);
  }
  await pause();
}
var held = new Set(holdings.map((h) => h.condition_id)).size;
console.log(
  `pm-record: ${leaders.size} leaders from ${boards.length}/${BOARDS.length} boards; ${markets.length} markets; ${holdings.length} leader holdings in ${held} markets (${holderFails} holder reads failed); ${trades.length} trades of $${BIG_TRADE_USD}+ (${tradeFails} failed)`
);
if (holderFails > markets.length / 2) throw new Error("most holder reads failed; not recording");
if (dry) {
  for (const h of holdings.slice(0, 3)) console.log(`  #${h.best_rank} ${h.wallet} ${h.outcome} $${Math.round(h.value_usd ?? 0)} in ${markets.find((m) => m.conditionId === h.condition_id)?.question}`);
  process.exit(0);
}
var db = d1From(args);
await db.exec(marketSql(markets.map((m) => marketRow(m, now))), "pm-markets");
await db.exec(holdingSql(holdings), "pm-holdings");
await db.exec(tradeSql(trades), "pm-trades");
console.log(`pm-record: recorded ${markets.length} markets, ${holdings.length} holdings, ${trades.length} trades`);
var toCheck = (await db.query(toCheckSql(now))).map((r) => r.condition_id);
var found = /* @__PURE__ */ new Map();
for (let i = 0; i < toCheck.length; i += 20) {
  const batch = toCheck.slice(i, i + 20);
  try {
    const rows = await getJson(`${GAMMA}/markets?closed=true&limit=50&${batch.map((c) => `condition_ids=${c}`).join("&")}`);
    for (const m of Array.isArray(rows) ? rows : []) {
      const w = winnerOf(m);
      const id = String(m?.conditionId ?? "").toLowerCase();
      if (w && batch.includes(id)) found.set(id, w);
    }
  } catch (e) {
    console.error(`pm-record: resolution batch: ${e}`);
  }
  await pause();
}
await db.exec(resolutionSql(toCheck, found, now), "pm-resolutions");
console.log(`pm-record: checked ${toCheck.length} unresolved markets, ${found.size} resolved`);
