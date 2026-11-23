// Built from a private repository (agent-data-api scripts/history-discover.ts). Do not edit.
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

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  "node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm({
  "node_modules/viem/_esm/utils/data/size.js"() {
    init_isHex();
  }
});

// node_modules/viem/_esm/errors/version.js
var version2;
var init_version2 = __esm({
  "node_modules/viem/_esm/errors/version.js"() {
    version2 = "2.57.8";
  }
});

// node_modules/viem/_esm/errors/base.js
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}
var errorConfig, BaseError2;
var init_base = __esm({
  "node_modules/viem/_esm/errors/base.js"() {
    init_version2();
    errorConfig = {
      getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
      version: `viem@${version2}`
    };
    BaseError2 = class _BaseError extends Error {
      constructor(shortMessage, args2 = {}) {
        const details = (() => {
          if (args2.cause instanceof _BaseError)
            return args2.cause.details;
          if (args2.cause?.message)
            return args2.cause.message;
          return args2.details;
        })();
        const docsPath = (() => {
          if (args2.cause instanceof _BaseError)
            return args2.cause.docsPath || args2.docsPath;
          return args2.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({ ...args2, docsPath });
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args2.metaMessages ? [...args2.metaMessages, ""] : [],
          ...docsUrl ? [`Docs: ${docsUrl}`] : [],
          ...details ? [`Details: ${details}`] : [],
          ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
        ].join("\n");
        super(message, args2.cause ? { cause: args2.cause } : void 0);
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
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BaseError"
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args2.metaMessages;
        this.name = args2.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = version2;
      }
      walk(fn) {
        return walk(this, fn);
      }
    };
  }
});

// node_modules/viem/_esm/errors/data.js
var SliceOffsetOutOfBoundsError, SizeExceedsPaddingSizeError;
var init_data = __esm({
  "node_modules/viem/_esm/errors/data.js"() {
    init_base();
    SliceOffsetOutOfBoundsError = class extends BaseError2 {
      constructor({ offset, position, size: size2 }) {
        super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size2}).`, { name: "SliceOffsetOutOfBoundsError" });
      }
    };
    SizeExceedsPaddingSizeError = class extends BaseError2 {
      constructor({ size: size2, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm({
  "node_modules/viem/_esm/utils/data/pad.js"() {
    init_data();
  }
});

// node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError, SizeOverflowError;
var init_encoding = __esm({
  "node_modules/viem/_esm/errors/encoding.js"() {
    init_base();
    IntegerOutOfRangeError = class extends BaseError2 {
      constructor({ max, min, signed, size: size2, value }) {
        super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
      }
    };
    SizeOverflowError = class extends BaseError2 {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/data/trim.js
function trim(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right")
      data = `${data}0`;
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}
var init_trim = __esm({
  "node_modules/viem/_esm/utils/data/trim.js"() {
  }
});

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size2 }) {
  if (size(hexOrBytes) > size2)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size2
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = Math.ceil((hex.length - 2) / 2);
  const max = (1n << BigInt(size2) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  const value = hexToBigInt(hex, opts);
  const number = Number(value);
  if (!Number.isSafeInteger(number))
    throw new IntegerOutOfRangeError({
      max: `${Number.MAX_SAFE_INTEGER}`,
      min: `${Number.MIN_SAFE_INTEGER}`,
      signed: opts.signed,
      size: opts.size,
      value: `${value}n`
    });
  return number;
}
var init_fromHex = __esm({
  "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
    init_encoding();
    init_size();
  }
});

// node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm({
  "node_modules/viem/_esm/utils/encoding/toHex.js"() {
    init_encoding();
    init_pad();
    init_fromHex();
    hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    encoder = /* @__PURE__ */ new TextEncoder();
  }
});

// node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
var encoder2, charCodeMap;
var init_toBytes = __esm({
  "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
    init_base();
    init_isHex();
    init_pad();
    init_fromHex();
    init_toHex();
    encoder2 = /* @__PURE__ */ new TextEncoder();
    charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
  }
});

// node_modules/@noble/hashes/esm/_u64.js
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
var init_u64 = __esm({
  "node_modules/@noble/hashes/esm/_u64.js"() {
    U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n = /* @__PURE__ */ BigInt(32);
    rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
  }
});

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
var isLE, swap32IfBE, Hash;
var init_utils2 = __esm({
  "node_modules/@noble/hashes/esm/utils.js"() {
    isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap32IfBE = isLE ? (u) => u : byteSwap32;
    Hash = class {
    };
  }
});

// node_modules/@noble/hashes/esm/sha3.js
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
var _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_PI, SHA3_ROTL, _SHA3_IOTA, IOTAS, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, keccak_256;
var init_sha3 = __esm({
  "node_modules/@noble/hashes/esm/sha3.js"() {
    init_u64();
    init_utils2();
    _0n = BigInt(0);
    _1n = BigInt(1);
    _2n = BigInt(2);
    _7n = BigInt(7);
    _256n = BigInt(256);
    _0x71n = BigInt(113);
    SHA3_PI = [];
    SHA3_ROTL = [];
    _SHA3_IOTA = [];
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    IOTAS = split(_SHA3_IOTA, true);
    SHA3_IOTA_H = IOTAS[0];
    SHA3_IOTA_L = IOTAS[1];
    rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
    rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
    Keccak = class _Keccak extends Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        anumber(outputLen);
        if (!(0 < blockLen && blockLen < 200))
          throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200);
        this.state32 = u32(this.state);
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        swap32IfBE(this.state32);
        keccakP(this.state32, this.rounds);
        swap32IfBE(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        aexists(this);
        data = toBytes2(data);
        abytes(data);
        const { blockLen, state } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        aexists(this, false);
        abytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        anumber(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        aoutput(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        clean(this.state);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
    keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
  }
});

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
var init_keccak256 = __esm({
  "node_modules/viem/_esm/utils/hash/keccak256.js"() {
    init_sha3();
    init_isHex();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/errors/address.js
var InvalidAddressError;
var init_address = __esm({
  "node_modules/viem/_esm/errors/address.js"() {
    init_base();
    InvalidAddressError = class extends BaseError2 {
      constructor({ address }) {
        super(`Address "${address}" is invalid.`, {
          metaMessages: [
            "- Address must be a hex value of 20 bytes (40 hex characters).",
            "- Address must match its checksum counterpart."
          ],
          name: "InvalidAddressError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/lru.js
var LruMap;
var init_lru = __esm({
  "node_modules/viem/_esm/utils/lru.js"() {
    LruMap = class extends Map {
      constructor(size2) {
        super();
        Object.defineProperty(this, "maxSize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.maxSize = size2;
      }
      get(key2) {
        const value = super.get(key2);
        if (super.has(key2)) {
          super.delete(key2);
          super.set(key2, value);
        }
        return value;
      }
      set(key2, value) {
        if (super.has(key2))
          super.delete(key2);
        super.set(key2, value);
        if (this.maxSize && this.size > this.maxSize) {
          const firstKey = super.keys().next().value;
          if (firstKey !== void 0)
            super.delete(firstKey);
        }
        return this;
      }
    };
  }
});

// node_modules/viem/_esm/utils/address/getAddress.js
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
var checksumAddressCache;
var init_getAddress = __esm({
  "node_modules/viem/_esm/utils/address/getAddress.js"() {
    init_toBytes();
    init_keccak256();
    init_lru();
    checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// node_modules/viem/_esm/utils/address/isAddress.js
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  const cacheKey = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey))
    return isAddressCache.get(cacheKey);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey, result);
  return result;
}
var addressRegex, isAddressCache;
var init_isAddress = __esm({
  "node_modules/viem/_esm/utils/address/isAddress.js"() {
    init_lru();
    init_getAddress();
    addressRegex = /^0x[a-fA-F0-9]{40}$/;
    isAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// node_modules/viem/_esm/utils/data/concat.js
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
var init_concat = __esm({
  "node_modules/viem/_esm/utils/data/concat.js"() {
  }
});

// node_modules/viem/_esm/utils/data/slice.js
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
var init_slice = __esm({
  "node_modules/viem/_esm/utils/data/slice.js"() {
    init_data();
    init_isHex();
    init_size();
  }
});

// node_modules/viem/_esm/errors/cursor.js
var NegativeOffsetError, PositionOutOfBoundsError, RecursiveReadLimitExceededError;
var init_cursor = __esm({
  "node_modules/viem/_esm/errors/cursor.js"() {
    init_base();
    NegativeOffsetError = class extends BaseError2 {
      constructor({ offset }) {
        super(`Offset \`${offset}\` cannot be negative.`, {
          name: "NegativeOffsetError"
        });
      }
    };
    PositionOutOfBoundsError = class extends BaseError2 {
      constructor({ length, position }) {
        super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
      }
    };
    RecursiveReadLimitExceededError = class extends BaseError2 {
      constructor({ count, limit }) {
        super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/cursor.js
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer ?? bytes, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
var staticCursor;
var init_cursor2 = __esm({
  "node_modules/viem/_esm/utils/cursor.js"() {
    init_cursor();
    staticCursor = {
      bytes: new Uint8Array(),
      dataView: new DataView(new ArrayBuffer(0)),
      position: 0,
      positionReadCount: /* @__PURE__ */ new Map(),
      recursiveReadCount: 0,
      recursiveReadLimit: Number.POSITIVE_INFINITY,
      assertReadLimit() {
        if (this.recursiveReadCount >= this.recursiveReadLimit)
          throw new RecursiveReadLimitExceededError({
            count: this.recursiveReadCount + 1,
            limit: this.recursiveReadLimit
          });
      },
      assertPosition(position) {
        if (position < 0 || position > this.bytes.length - 1)
          throw new PositionOutOfBoundsError({
            length: this.bytes.length,
            position
          });
      },
      decrementPosition(offset) {
        if (offset < 0)
          throw new NegativeOffsetError({ offset });
        const position = this.position - offset;
        this.assertPosition(position);
        this.position = position;
      },
      getReadCount(position) {
        return this.positionReadCount.get(position || this.position) || 0;
      },
      incrementPosition(offset) {
        if (offset < 0)
          throw new NegativeOffsetError({ offset });
        const position = this.position + offset;
        this.assertPosition(position);
        this.position = position;
      },
      inspectByte(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position);
        return this.bytes[position];
      },
      inspectBytes(length, position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + length - 1);
        return this.bytes.subarray(position, position + length);
      },
      inspectUint8(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position);
        return this.bytes[position];
      },
      inspectUint16(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 1);
        return this.dataView.getUint16(position);
      },
      inspectUint24(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 2);
        return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
      },
      inspectUint32(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 3);
        return this.dataView.getUint32(position);
      },
      pushByte(byte) {
        this.assertPosition(this.position);
        this.bytes[this.position] = byte;
        this.position++;
      },
      pushBytes(bytes) {
        this.assertPosition(this.position + bytes.length - 1);
        this.bytes.set(bytes, this.position);
        this.position += bytes.length;
      },
      pushUint8(value) {
        this.assertPosition(this.position);
        this.bytes[this.position] = value;
        this.position++;
      },
      pushUint16(value) {
        this.assertPosition(this.position + 1);
        this.dataView.setUint16(this.position, value);
        this.position += 2;
      },
      pushUint24(value) {
        this.assertPosition(this.position + 2);
        this.dataView.setUint16(this.position, value >> 8);
        this.dataView.setUint8(this.position + 2, value & ~4294967040);
        this.position += 3;
      },
      pushUint32(value) {
        this.assertPosition(this.position + 3);
        this.dataView.setUint32(this.position, value);
        this.position += 4;
      },
      readByte() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectByte();
        this.position++;
        return value;
      },
      readBytes(length, size2) {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectBytes(length);
        this.position += size2 ?? length;
        return value;
      },
      readUint8() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint8();
        this.position += 1;
        return value;
      },
      readUint16() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint16();
        this.position += 2;
        return value;
      },
      readUint24() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint24();
        this.position += 3;
        return value;
      },
      readUint32() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint32();
        this.position += 4;
        return value;
      },
      get remaining() {
        return this.bytes.length - this.position;
      },
      setPosition(position) {
        const oldPosition = this.position;
        this.assertPosition(position);
        this.position = position;
        return () => this.position = oldPosition;
      },
      _touch() {
        if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
          return;
        const count = this.getReadCount();
        this.positionReadCount.set(this.position, count + 1);
        if (count > 0)
          this.recursiveReadCount++;
      }
    };
  }
});

// node_modules/viem/_esm/utils/unit/Value.js
function format(value, decimals = 0) {
  if (!Number.isInteger(decimals) || decimals < 0)
    throw new InvalidDecimalsError({ decimals });
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
function formatGwei(wei, unit = "wei") {
  return format(wei, exponents.gwei - exponents[unit]);
}
var exponents, InvalidDecimalsError;
var init_Value = __esm({
  "node_modules/viem/_esm/utils/unit/Value.js"() {
    exponents = {
      wei: 0,
      gwei: 9,
      szabo: 12,
      finney: 15,
      ether: 18
    };
    InvalidDecimalsError = class extends Error {
      constructor({ decimals }) {
        super(`\`decimals\` must be a non-negative integer. Got \`${decimals}\`.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Value.InvalidDecimalsError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/unit/formatGwei.js
function formatGwei2(wei, unit = "wei") {
  return formatGwei(wei, unit);
}
var init_formatGwei = __esm({
  "node_modules/viem/_esm/utils/unit/formatGwei.js"() {
    init_Value();
  }
});

// node_modules/viem/_esm/errors/transaction.js
function prettyPrint(args2) {
  const entries = Object.entries(args2).map(([key2, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key2, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key2]) => Math.max(acc, key2.length), 0);
  return entries.map(([key2, value]) => `  ${`${key2}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
var InvalidLegacyVError, InvalidSerializableTransactionError, InvalidStorageKeySizeError;
var init_transaction = __esm({
  "node_modules/viem/_esm/errors/transaction.js"() {
    init_base();
    InvalidLegacyVError = class extends BaseError2 {
      constructor({ v }) {
        super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
          name: "InvalidLegacyVError"
        });
      }
    };
    InvalidSerializableTransactionError = class extends BaseError2 {
      constructor({ transaction }) {
        super("Cannot infer a transaction type from provided transaction.", {
          metaMessages: [
            "Provided Transaction:",
            "{",
            prettyPrint(transaction),
            "}",
            "",
            "To infer the type, either provide:",
            "- a `type` to the Transaction, or",
            "- an EIP-1559 Transaction with `maxFeePerGas`, or",
            "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
            "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
            "- an EIP-7702 Transaction with `authorizationList`, or",
            "- a Legacy Transaction with `gasPrice`"
          ],
          name: "InvalidSerializableTransactionError"
        });
      }
    };
    InvalidStorageKeySizeError = class extends BaseError2 {
      constructor({ storageKey }) {
        super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/encoding/toRlp.js
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode } of list) {
        encode(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError2("Length is too large.");
}
var init_toRlp = __esm({
  "node_modules/viem/_esm/utils/encoding/toRlp.js"() {
    init_base();
    init_cursor2();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/errors/node.js
var ExecutionRevertedError, FeeCapTooHighError, FeeCapTooLowError, NonceTooHighError, NonceTooLowError, NonceMaxValueError, InsufficientFundsError, IntrinsicGasTooHighError, IntrinsicGasTooLowError, TransactionTypeNotSupportedError, TipAboveFeeCapError;
var init_node = __esm({
  "node_modules/viem/_esm/errors/node.js"() {
    init_formatGwei();
    init_base();
    ExecutionRevertedError = class extends BaseError2 {
      constructor({ cause, message } = {}) {
        const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
        super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
          cause,
          name: "ExecutionRevertedError"
        });
      }
    };
    Object.defineProperty(ExecutionRevertedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /execution reverted|gas required exceeds allowance/
    });
    FeeCapTooHighError = class extends BaseError2 {
      constructor({ cause, maxFeePerGas } = {}) {
        super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei2(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
          cause,
          name: "FeeCapTooHighError"
        });
      }
    };
    Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
    });
    FeeCapTooLowError = class extends BaseError2 {
      constructor({ cause, maxFeePerGas } = {}) {
        super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei2(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
          cause,
          name: "FeeCapTooLowError"
        });
      }
    };
    Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
    });
    NonceTooHighError = class extends BaseError2 {
      constructor({ cause, nonce } = {}) {
        super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
      }
    };
    Object.defineProperty(NonceTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce too high/
    });
    NonceTooLowError = class extends BaseError2 {
      constructor({ cause, nonce } = {}) {
        super([
          `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
          "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
        ].join("\n"), { cause, name: "NonceTooLowError" });
      }
    };
    Object.defineProperty(NonceTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce too low|transaction already imported|already known/
    });
    NonceMaxValueError = class extends BaseError2 {
      constructor({ cause, nonce } = {}) {
        super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
      }
    };
    Object.defineProperty(NonceMaxValueError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce has max value/
    });
    InsufficientFundsError = class extends BaseError2 {
      constructor({ cause } = {}) {
        super([
          "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
        ].join("\n"), {
          cause,
          metaMessages: [
            "This error could arise when the account does not have enough funds to:",
            " - pay for the total gas fee,",
            " - pay for the value to send.",
            " ",
            "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
            " - `gas` is the amount of gas needed for transaction to execute,",
            " - `gas fee` is the gas fee,",
            " - `value` is the amount of ether to send to the recipient."
          ],
          name: "InsufficientFundsError"
        });
      }
    };
    Object.defineProperty(InsufficientFundsError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /insufficient funds|exceeds transaction sender account balance/
    });
    IntrinsicGasTooHighError = class extends BaseError2 {
      constructor({ cause, gas } = {}) {
        super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
          cause,
          name: "IntrinsicGasTooHighError"
        });
      }
    };
    Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /intrinsic gas too high|gas limit reached/
    });
    IntrinsicGasTooLowError = class extends BaseError2 {
      constructor({ cause, gas } = {}) {
        super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
          cause,
          name: "IntrinsicGasTooLowError"
        });
      }
    };
    Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /intrinsic gas too low/
    });
    TransactionTypeNotSupportedError = class extends BaseError2 {
      constructor({ cause }) {
        super("The transaction type is not supported for this chain.", {
          cause,
          name: "TransactionTypeNotSupportedError"
        });
      }
    };
    Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /transaction type not valid/
    });
    TipAboveFeeCapError = class extends BaseError2 {
      constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
        super([
          `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei2(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei2(maxFeePerGas)} gwei` : ""}).`
        ].join("\n"), {
          cause,
          name: "TipAboveFeeCapError"
        });
      }
    };
    Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
    });
  }
});

// node_modules/viem/_esm/utils/formatters/formatter.js
function defineFormatter(type, format2) {
  return ({ exclude, format: overrides }) => {
    return {
      exclude,
      format: (args2, action) => {
        const formatted = format2(args2, action);
        if (exclude) {
          for (const key2 of exclude) {
            delete formatted[key2];
          }
        }
        return {
          ...formatted,
          ...overrides(args2, action)
        };
      },
      type
    };
  };
}
var init_formatter = __esm({
  "node_modules/viem/_esm/utils/formatters/formatter.js"() {
  }
});

// node_modules/viem/_esm/constants/number.js
var maxInt8, maxInt16, maxInt24, maxInt32, maxInt40, maxInt48, maxInt56, maxInt64, maxInt72, maxInt80, maxInt88, maxInt96, maxInt104, maxInt112, maxInt120, maxInt128, maxInt136, maxInt144, maxInt152, maxInt160, maxInt168, maxInt176, maxInt184, maxInt192, maxInt200, maxInt208, maxInt216, maxInt224, maxInt232, maxInt240, maxInt248, maxInt256, minInt8, minInt16, minInt24, minInt32, minInt40, minInt48, minInt56, minInt64, minInt72, minInt80, minInt88, minInt96, minInt104, minInt112, minInt120, minInt128, minInt136, minInt144, minInt152, minInt160, minInt168, minInt176, minInt184, minInt192, minInt200, minInt208, minInt216, minInt224, minInt232, minInt240, minInt248, minInt256, maxUint8, maxUint16, maxUint24, maxUint32, maxUint40, maxUint48, maxUint56, maxUint64, maxUint72, maxUint80, maxUint88, maxUint96, maxUint104, maxUint112, maxUint120, maxUint128, maxUint136, maxUint144, maxUint152, maxUint160, maxUint168, maxUint176, maxUint184, maxUint192, maxUint200, maxUint208, maxUint216, maxUint224, maxUint232, maxUint240, maxUint248, maxUint256;
var init_number = __esm({
  "node_modules/viem/_esm/constants/number.js"() {
    maxInt8 = 2n ** (8n - 1n) - 1n;
    maxInt16 = 2n ** (16n - 1n) - 1n;
    maxInt24 = 2n ** (24n - 1n) - 1n;
    maxInt32 = 2n ** (32n - 1n) - 1n;
    maxInt40 = 2n ** (40n - 1n) - 1n;
    maxInt48 = 2n ** (48n - 1n) - 1n;
    maxInt56 = 2n ** (56n - 1n) - 1n;
    maxInt64 = 2n ** (64n - 1n) - 1n;
    maxInt72 = 2n ** (72n - 1n) - 1n;
    maxInt80 = 2n ** (80n - 1n) - 1n;
    maxInt88 = 2n ** (88n - 1n) - 1n;
    maxInt96 = 2n ** (96n - 1n) - 1n;
    maxInt104 = 2n ** (104n - 1n) - 1n;
    maxInt112 = 2n ** (112n - 1n) - 1n;
    maxInt120 = 2n ** (120n - 1n) - 1n;
    maxInt128 = 2n ** (128n - 1n) - 1n;
    maxInt136 = 2n ** (136n - 1n) - 1n;
    maxInt144 = 2n ** (144n - 1n) - 1n;
    maxInt152 = 2n ** (152n - 1n) - 1n;
    maxInt160 = 2n ** (160n - 1n) - 1n;
    maxInt168 = 2n ** (168n - 1n) - 1n;
    maxInt176 = 2n ** (176n - 1n) - 1n;
    maxInt184 = 2n ** (184n - 1n) - 1n;
    maxInt192 = 2n ** (192n - 1n) - 1n;
    maxInt200 = 2n ** (200n - 1n) - 1n;
    maxInt208 = 2n ** (208n - 1n) - 1n;
    maxInt216 = 2n ** (216n - 1n) - 1n;
    maxInt224 = 2n ** (224n - 1n) - 1n;
    maxInt232 = 2n ** (232n - 1n) - 1n;
    maxInt240 = 2n ** (240n - 1n) - 1n;
    maxInt248 = 2n ** (248n - 1n) - 1n;
    maxInt256 = 2n ** (256n - 1n) - 1n;
    minInt8 = -(2n ** (8n - 1n));
    minInt16 = -(2n ** (16n - 1n));
    minInt24 = -(2n ** (24n - 1n));
    minInt32 = -(2n ** (32n - 1n));
    minInt40 = -(2n ** (40n - 1n));
    minInt48 = -(2n ** (48n - 1n));
    minInt56 = -(2n ** (56n - 1n));
    minInt64 = -(2n ** (64n - 1n));
    minInt72 = -(2n ** (72n - 1n));
    minInt80 = -(2n ** (80n - 1n));
    minInt88 = -(2n ** (88n - 1n));
    minInt96 = -(2n ** (96n - 1n));
    minInt104 = -(2n ** (104n - 1n));
    minInt112 = -(2n ** (112n - 1n));
    minInt120 = -(2n ** (120n - 1n));
    minInt128 = -(2n ** (128n - 1n));
    minInt136 = -(2n ** (136n - 1n));
    minInt144 = -(2n ** (144n - 1n));
    minInt152 = -(2n ** (152n - 1n));
    minInt160 = -(2n ** (160n - 1n));
    minInt168 = -(2n ** (168n - 1n));
    minInt176 = -(2n ** (176n - 1n));
    minInt184 = -(2n ** (184n - 1n));
    minInt192 = -(2n ** (192n - 1n));
    minInt200 = -(2n ** (200n - 1n));
    minInt208 = -(2n ** (208n - 1n));
    minInt216 = -(2n ** (216n - 1n));
    minInt224 = -(2n ** (224n - 1n));
    minInt232 = -(2n ** (232n - 1n));
    minInt240 = -(2n ** (240n - 1n));
    minInt248 = -(2n ** (248n - 1n));
    minInt256 = -(2n ** (256n - 1n));
    maxUint8 = 2n ** 8n - 1n;
    maxUint16 = 2n ** 16n - 1n;
    maxUint24 = 2n ** 24n - 1n;
    maxUint32 = 2n ** 32n - 1n;
    maxUint40 = 2n ** 40n - 1n;
    maxUint48 = 2n ** 48n - 1n;
    maxUint56 = 2n ** 56n - 1n;
    maxUint64 = 2n ** 64n - 1n;
    maxUint72 = 2n ** 72n - 1n;
    maxUint80 = 2n ** 80n - 1n;
    maxUint88 = 2n ** 88n - 1n;
    maxUint96 = 2n ** 96n - 1n;
    maxUint104 = 2n ** 104n - 1n;
    maxUint112 = 2n ** 112n - 1n;
    maxUint120 = 2n ** 120n - 1n;
    maxUint128 = 2n ** 128n - 1n;
    maxUint136 = 2n ** 136n - 1n;
    maxUint144 = 2n ** 144n - 1n;
    maxUint152 = 2n ** 152n - 1n;
    maxUint160 = 2n ** 160n - 1n;
    maxUint168 = 2n ** 168n - 1n;
    maxUint176 = 2n ** 176n - 1n;
    maxUint184 = 2n ** 184n - 1n;
    maxUint192 = 2n ** 192n - 1n;
    maxUint200 = 2n ** 200n - 1n;
    maxUint208 = 2n ** 208n - 1n;
    maxUint216 = 2n ** 216n - 1n;
    maxUint224 = 2n ** 224n - 1n;
    maxUint232 = 2n ** 232n - 1n;
    maxUint240 = 2n ** 240n - 1n;
    maxUint248 = 2n ** 248n - 1n;
    maxUint256 = 2n ** 256n - 1n;
  }
});

// node_modules/viem/_esm/utils/formatters/transaction.js
function formatTransaction(transaction, _) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    ...transaction.blockTimestamp != null && {
      blockTimestamp: BigInt(transaction.blockTimestamp)
    },
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559")
    delete transaction_.maxFeePerBlobGas;
  return transaction_;
}
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}
var transactionType, defineTransaction;
var init_transaction2 = __esm({
  "node_modules/viem/_esm/utils/formatters/transaction.js"() {
    init_fromHex();
    init_formatter();
    transactionType = {
      "0x0": "legacy",
      "0x1": "eip2930",
      "0x2": "eip1559",
      "0x3": "eip4844",
      "0x4": "eip7702"
    };
    defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
  }
});

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block, _) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock;
var init_block = __esm({
  "node_modules/viem/_esm/utils/formatters/block.js"() {
    init_formatter();
    init_transaction2();
    defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);
  }
});

// node_modules/viem/_esm/utils/blob/blobsToCommitments.js
function blobsToCommitments(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}
var init_blobsToCommitments = __esm({
  "node_modules/viem/_esm/utils/blob/blobsToCommitments.js"() {
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/blob/blobsToProofs.js
function blobsToProofs(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}
var init_blobsToProofs = __esm({
  "node_modules/viem/_esm/utils/blob/blobsToProofs.js"() {
    init_toBytes();
    init_toHex();
  }
});

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD, SHA256_IV;
var init_md = __esm({
  "node_modules/@noble/hashes/esm/_md.js"() {
    init_utils2();
    HashMD = class extends Hash {
      constructor(blockLen, outputLen, padOffset, isLE2) {
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE2;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
      }
      update(data) {
        aexists(this);
        data = toBytes2(data);
        abytes(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = createView(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(view, 0);
            this.pos = 0;
          }
        }
        this.length += data.length;
        this.roundClean();
        return this;
      }
      digestInto(out) {
        aexists(this);
        aoutput(out, this);
        this.finished = true;
        const { buffer, view, blockLen, isLE: isLE2 } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        clean(this.buffer.subarray(pos));
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
        this.process(view, 0);
        const oview = createView(out);
        const len = this.outputLen;
        if (len % 4)
          throw new Error("_sha2: outputLen should be aligned to 32bit");
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
          throw new Error("_sha2: outputLen bigger than state");
        for (let i = 0; i < outLen; i++)
          oview.setUint32(4 * i, state[i], isLE2);
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen)
          to.buffer.set(buffer);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
    };
    SHA256_IV = /* @__PURE__ */ Uint32Array.from([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
  }
});

// node_modules/@noble/hashes/esm/sha2.js
var SHA256_K, SHA256_W, SHA256, sha256;
var init_sha2 = __esm({
  "node_modules/@noble/hashes/esm/sha2.js"() {
    init_md();
    init_utils2();
    SHA256_K = /* @__PURE__ */ Uint32Array.from([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    SHA256_W = /* @__PURE__ */ new Uint32Array(64);
    SHA256 = class extends HashMD {
      constructor(outputLen = 32) {
        super(64, outputLen, 8, false);
        this.A = SHA256_IV[0] | 0;
        this.B = SHA256_IV[1] | 0;
        this.C = SHA256_IV[2] | 0;
        this.D = SHA256_IV[3] | 0;
        this.E = SHA256_IV[4] | 0;
        this.F = SHA256_IV[5] | 0;
        this.G = SHA256_IV[6] | 0;
        this.H = SHA256_IV[7] | 0;
      }
      get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
      }
      // prettier-ignore
      set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }
      process(view, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
          SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
          const W15 = SHA256_W[i - 15];
          const W2 = SHA256_W[i - 2];
          const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
          const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
          SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
          const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
          const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
          const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
          const T2 = sigma0 + Maj(A, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D + T1 | 0;
          D = C;
          C = B;
          B = A;
          A = T1 + T2 | 0;
        }
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
      }
      roundClean() {
        clean(SHA256_W);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        clean(this.buffer);
      }
    };
    sha256 = /* @__PURE__ */ createHasher(() => new SHA256());
  }
});

// node_modules/@noble/hashes/esm/sha256.js
var sha2562;
var init_sha256 = __esm({
  "node_modules/@noble/hashes/esm/sha256.js"() {
    init_sha2();
    sha2562 = sha256;
  }
});

// node_modules/viem/_esm/utils/hash/sha256.js
function sha2563(value, to_) {
  const to = to_ || "hex";
  const bytes = sha2562(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
var init_sha2562 = __esm({
  "node_modules/viem/_esm/utils/hash/sha256.js"() {
    init_sha256();
    init_isHex();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash(parameters) {
  const { commitment, version: version3 = 1 } = parameters;
  const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha2563(commitment, "bytes");
  versionedHash.set([version3], 0);
  return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}
var init_commitmentToVersionedHash = __esm({
  "node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js"() {
    init_toHex();
    init_sha2562();
  }
});

// node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes(parameters) {
  const { commitments, version: version3 } = parameters;
  const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version: version3
    }));
  }
  return hashes;
}
var init_commitmentsToVersionedHashes = __esm({
  "node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js"() {
    init_commitmentToVersionedHash();
  }
});

// node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction, bytesPerFieldElement, fieldElementsPerBlob, bytesPerBlob, maxBytesPerTransaction;
var init_blob = __esm({
  "node_modules/viem/_esm/constants/blob.js"() {
    blobsPerTransaction = 6;
    bytesPerFieldElement = 32;
    fieldElementsPerBlob = 4096;
    bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
    maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
    1 - // zero byte (0x00) appended to each field element.
    1 * fieldElementsPerBlob * blobsPerTransaction;
  }
});

// node_modules/viem/_esm/constants/kzg.js
var versionedHashVersionKzg;
var init_kzg = __esm({
  "node_modules/viem/_esm/constants/kzg.js"() {
    versionedHashVersionKzg = 1;
  }
});

// node_modules/viem/_esm/errors/blob.js
var BlobSizeTooLargeError, EmptyBlobError, InvalidVersionedHashSizeError, InvalidVersionedHashVersionError;
var init_blob2 = __esm({
  "node_modules/viem/_esm/errors/blob.js"() {
    init_kzg();
    init_base();
    BlobSizeTooLargeError = class extends BaseError2 {
      constructor({ maxSize, size: size2 }) {
        super("Blob size is too large.", {
          metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size2} bytes`],
          name: "BlobSizeTooLargeError"
        });
      }
    };
    EmptyBlobError = class extends BaseError2 {
      constructor() {
        super("Blob data must not be empty.", { name: "EmptyBlobError" });
      }
    };
    InvalidVersionedHashSizeError = class extends BaseError2 {
      constructor({ hash, size: size2 }) {
        super(`Versioned hash "${hash}" size is invalid.`, {
          metaMessages: ["Expected: 32", `Received: ${size2}`],
          name: "InvalidVersionedHashSizeError"
        });
      }
    };
    InvalidVersionedHashVersionError = class extends BaseError2 {
      constructor({ hash, version: version3 }) {
        super(`Versioned hash "${hash}" version is invalid.`, {
          metaMessages: [
            `Expected: ${versionedHashVersionKzg}`,
            `Received: ${version3}`
          ],
          name: "InvalidVersionedHashVersionError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/blob/toBlobs.js
function toBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data);
  if (!size_)
    throw new EmptyBlobError();
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob));
    let size2 = 0;
    while (size2 < fieldElementsPerBlob) {
      const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size2++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}
var init_toBlobs = __esm({
  "node_modules/viem/_esm/utils/blob/toBlobs.js"() {
    init_blob();
    init_blob2();
    init_cursor2();
    init_size();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars(parameters) {
  const { data, kzg, to } = parameters;
  const blobs = parameters.blobs ?? toBlobs({ data, to });
  const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
  const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
  const sidecars = [];
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}
var init_toBlobSidecars = __esm({
  "node_modules/viem/_esm/utils/blob/toBlobSidecars.js"() {
    init_blobsToCommitments();
    init_blobsToProofs();
    init_toBlobs();
  }
});

// node_modules/viem/_esm/utils/transaction/getTransactionType.js
function getTransactionType(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}
var init_getTransactionType = __esm({
  "node_modules/viem/_esm/utils/transaction/getTransactionType.js"() {
    init_transaction();
  }
});

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args: args2, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    blockTimestamp: log.blockTimestamp ? BigInt(log.blockTimestamp) : log.blockTimestamp === null ? null : void 0,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args: args2, eventName } : {}
  };
}
var init_log = __esm({
  "node_modules/viem/_esm/utils/formatters/log.js"() {
  }
});

// node_modules/viem/_esm/errors/chain.js
var InvalidChainIdError;
var init_chain = __esm({
  "node_modules/viem/_esm/errors/chain.js"() {
    init_base();
    InvalidChainIdError = class extends BaseError2 {
      constructor({ chainId }) {
        super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
function formatTransactionReceipt(transactionReceipt, _) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var receiptStatuses, defineTransactionReceipt;
var init_transactionReceipt = __esm({
  "node_modules/viem/_esm/utils/formatters/transactionReceipt.js"() {
    init_fromHex();
    init_formatter();
    init_log();
    init_transaction2();
    receiptStatuses = {
      "0x0": "reverted",
      "0x1": "success"
    };
    defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);
  }
});

// node_modules/viem/_esm/utils/transaction/assertTransaction.js
function assertTransactionEIP7702(transaction) {
  const { authorizationList } = transaction;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { chainId } = authorization;
      const address = authorization.address;
      if (!isAddress(address))
        throw new InvalidAddressError({ address });
      if (chainId < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP4844(transaction) {
  const { blobVersionedHashes } = transaction;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError();
    for (const hash of blobVersionedHashes) {
      const size_ = size(hash);
      const version3 = hexToNumber(slice(hash, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError({ hash, size: size_ });
      if (version3 !== versionedHashVersionKzg)
        throw new InvalidVersionedHashVersionError({
          hash,
          version: version3
        });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP1559(transaction) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxFeePerGas && maxFeePerGas > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError2("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError2("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
var init_assertTransaction = __esm({
  "node_modules/viem/_esm/utils/transaction/assertTransaction.js"() {
    init_kzg();
    init_number();
    init_address();
    init_base();
    init_blob2();
    init_chain();
    init_node();
    init_isAddress();
    init_size();
    init_slice();
    init_fromHex();
  }
});

// node_modules/viem/_esm/utils/transaction/serializeAccessList.js
function serializeAccessList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i = 0; i < accessList.length; i++) {
    const { address, storageKeys } = accessList[i];
    for (let j = 0; j < storageKeys.length; j++) {
      if (storageKeys[j].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
      }
    }
    if (!isAddress(address, { strict: false })) {
      throw new InvalidAddressError({ address });
    }
    serializedAccessList.push([address, storageKeys]);
  }
  return serializedAccessList;
}
var init_serializeAccessList = __esm({
  "node_modules/viem/_esm/utils/transaction/serializeAccessList.js"() {
    init_address();
    init_transaction();
    init_isAddress();
  }
});

// node_modules/viem/_esm/utils/transaction/serializeTransaction.js
function serializeTransaction(transaction, signature) {
  const type = getTransactionType(transaction);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction, signature);
  if (type === "eip7702")
    return serializeTransactionEIP7702(transaction, signature);
  return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
  const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP7702(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
  return concatHex([
    "0x04",
    toRlp([
      numberToHex(chainId),
      nonce ? numberToHex(nonce) : "0x",
      maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      serializedAuthorizationList,
      ...toYParitySignatureArray(transaction, signature)
    ])
  ]);
}
function serializeTransactionEIP4844(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP4844(transaction);
  let blobVersionedHashes = transaction.blobVersionedHashes;
  let sidecars = transaction.sidecars;
  if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex(x));
    const kzg = transaction.kzg;
    const commitments2 = blobsToCommitments({
      blobs: blobs2,
      kzg
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
      sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    maxFeePerBlobGas ? numberToHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes ?? [],
    ...toYParitySignatureArray(transaction, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i = 0; i < sidecars.length; i++) {
      const { blob, commitment, proof } = sidecars[i];
      blobs.push(blob);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? (
      // If sidecars are enabled, envelope turns into a "wrapper":
      toRlp([serializedTransaction, blobs, commitments, proofs])
    ) : (
      // If sidecars are disabled, standard envelope is used:
      toRlp(serializedTransaction)
    )
  ]);
}
function serializeTransactionEIP1559(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP1559(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x02",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionEIP2930(transaction, signature) {
  const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
  assertTransactionEIP2930(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    numberToHex(chainId),
    nonce ? numberToHex(nonce) : "0x",
    gasPrice ? numberToHex(gasPrice) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x01",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionLegacy(transaction, signature) {
  const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
  assertTransactionLegacy(transaction);
  let serializedTransaction = [
    nonce ? numberToHex(nonce) : "0x",
    gasPrice ? numberToHex(gasPrice) : "0x",
    gas ? numberToHex(gas) : "0x",
    to ?? "0x",
    value ? numberToHex(value) : "0x",
    data ?? "0x"
  ];
  if (signature) {
    const v = (() => {
      if (signature.v >= 35n) {
        const inferredChainId = (signature.v - 35n) / 2n;
        if (inferredChainId > 0)
          return signature.v;
        return 27n + (signature.v === 35n ? 0n : 1n);
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
      const v2 = 27n + (signature.v === 27n ? 0n : 1n);
      if (signature.v !== v2)
        throw new InvalidLegacyVError({ v: signature.v });
      return v2;
    })();
    const r = trim(signature.r);
    const s = trim(signature.s);
    serializedTransaction = [
      ...serializedTransaction,
      numberToHex(v),
      r === "0x00" ? "0x" : r,
      s === "0x00" ? "0x" : s
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      numberToHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp(serializedTransaction);
}
function toYParitySignatureArray(transaction, signature_) {
  const signature = signature_ ?? transaction;
  const { v, yParity } = signature;
  if (typeof signature.r === "undefined")
    return [];
  if (typeof signature.s === "undefined")
    return [];
  if (typeof v === "undefined" && typeof yParity === "undefined")
    return [];
  const r = trim(signature.r);
  const s = trim(signature.s);
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? numberToHex(1) : "0x";
    if (v === 0n)
      return "0x";
    if (v === 1n)
      return numberToHex(1);
    return v === 27n ? "0x" : numberToHex(1);
  })();
  return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
}
var init_serializeTransaction = __esm({
  "node_modules/viem/_esm/utils/transaction/serializeTransaction.js"() {
    init_transaction();
    init_serializeAuthorizationList();
    init_blobsToCommitments();
    init_blobsToProofs();
    init_commitmentsToVersionedHashes();
    init_toBlobSidecars();
    init_concat();
    init_trim();
    init_toHex();
    init_toRlp();
    init_assertTransaction();
    init_getTransactionType();
    init_serializeAccessList();
  }
});

// node_modules/viem/_esm/utils/authorization/serializeAuthorizationList.js
function serializeAuthorizationList(authorizationList) {
  if (!authorizationList || authorizationList.length === 0)
    return [];
  const serializedAuthorizationList = [];
  for (const authorization of authorizationList) {
    const { chainId, nonce, ...signature } = authorization;
    const contractAddress = authorization.address;
    serializedAuthorizationList.push([
      chainId ? toHex(chainId) : "0x",
      contractAddress,
      nonce ? toHex(nonce) : "0x",
      ...toYParitySignatureArray({}, signature)
    ]);
  }
  return serializedAuthorizationList;
}
var init_serializeAuthorizationList = __esm({
  "node_modules/viem/_esm/utils/authorization/serializeAuthorizationList.js"() {
    init_toHex();
    init_serializeTransaction();
  }
});

// node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain2) {
  const chainInstance = {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...chain2
  };
  function extend(base2) {
    return (fnOrExtended) => {
      const properties = typeof fnOrExtended === "function" ? fnOrExtended(base2) : fnOrExtended;
      const combined = { ...base2, ...properties };
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(chainInstance, {
    extend: extend(chainInstance)
  });
}
var init_defineChain = __esm({
  "node_modules/viem/_esm/utils/chain/defineChain.js"() {
  }
});

// node_modules/@scure/base/lib/esm/index.js
function isBytes2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber2(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function chain(...args2) {
  const id = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode = args2.map((x) => x.encode).reduceRight(wrap, id);
  const decode = args2.map((x) => x.decode).reduce(wrap, id);
  return { encode, decode };
}
// @__NO_SIDE_EFFECTS__
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l, i) => [l, i]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i) => {
        if (!Number.isSafeInteger(i) || i < 0 || i >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
        return lettersA[i];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i = indexes.get(letter);
        if (i === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i;
      });
    }
  };
}
// @__NO_SIDE_EFFECTS__
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from) => {
      astrArr("join.decode", from);
      return from.join(separator);
    },
    decode: (to) => {
      astr("join.decode", to);
      return to.split(separator);
    }
  };
}
function convertRadix(data, from, to) {
  if (from < 2)
    throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
  if (to < 2)
    throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
  aArr(data);
  if (!data.length)
    return [];
  let pos = 0;
  const res = [];
  const digits = Array.from(data, (d) => {
    anumber2(d);
    if (d < 0 || d >= from)
      throw new Error(`invalid integer: ${d}`);
    return d;
  });
  const dlen = digits.length;
  while (true) {
    let carry = 0;
    let done = true;
    for (let i = pos; i < dlen; i++) {
      const digit = digits[i];
      const fromCarry = from * carry;
      const digitBase = fromCarry + digit;
      if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
        throw new Error("convertRadix: carry overflow");
      }
      const div = digitBase / to;
      carry = digitBase % to;
      const rounded = Math.floor(div);
      digits[i] = rounded;
      if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase)
        throw new Error("convertRadix: carry overflow");
      if (!done)
        continue;
      else if (!rounded)
        pos = i;
      else
        done = false;
    }
    res.push(carry);
    if (done)
      break;
  }
  for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
    res.push(0);
  return res.reverse();
}
// @__NO_SIDE_EFFECTS__
function radix(num2) {
  anumber2(num2);
  const _256 = 2 ** 8;
  return {
    encode: (bytes) => {
      if (!isBytes2(bytes))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(bytes), _256, num2);
    },
    decode: (digits) => {
      anumArr("radix.decode", digits);
      return Uint8Array.from(convertRadix(digits, num2, _256));
    }
  };
}
var genBase58, base58;
var init_esm = __esm({
  "node_modules/@scure/base/lib/esm/index.js"() {
    genBase58 = /* @__NO_SIDE_EFFECTS__ */ (abc) => /* @__PURE__ */ chain(/* @__PURE__ */ radix(58), /* @__PURE__ */ alphabet(abc), /* @__PURE__ */ join(""));
    base58 = /* @__PURE__ */ genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  }
});

// node_modules/viem/_esm/index.js
init_exports();

// node_modules/viem/_esm/op-stack/contracts.js
var contracts = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
};

// node_modules/viem/_esm/op-stack/formatters.js
init_fromHex();
init_block();
init_transaction2();
init_transactionReceipt();
var formatters = {
  block: /* @__PURE__ */ defineBlock({
    format(args2) {
      const transactions = args2.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        if (formatted.typeHex === "0x7e") {
          formatted.isSystemTx = transaction.isSystemTx;
          formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
          formatted.sourceHash = transaction.sourceHash;
          formatted.type = "deposit";
        }
        return formatted;
      });
      return {
        transactions,
        stateRoot: args2.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args2) {
      const transaction = {};
      if (args2.type === "0x7e") {
        transaction.isSystemTx = args2.isSystemTx;
        transaction.mint = args2.mint ? hexToBigInt(args2.mint) : void 0;
        transaction.sourceHash = args2.sourceHash;
        transaction.type = "deposit";
      }
      return transaction;
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args2) {
      return {
        ...args2.depositNonce ? { depositNonce: hexToBigInt(args2.depositNonce) } : {},
        ...args2.depositReceiptVersion ? { depositReceiptVersion: hexToNumber(args2.depositReceiptVersion) } : {},
        l1GasPrice: args2.l1GasPrice ? hexToBigInt(args2.l1GasPrice) : null,
        l1GasUsed: args2.l1GasUsed ? hexToBigInt(args2.l1GasUsed) : null,
        l1Fee: args2.l1Fee ? hexToBigInt(args2.l1Fee) : null,
        l1FeeScalar: args2.l1FeeScalar ? Number(args2.l1FeeScalar) : null
      };
    }
  })
};

// node_modules/viem/_esm/op-stack/serializers.js
init_address();
init_isAddress();
init_concat();
init_toHex();
init_toRlp();
init_serializeTransaction();
function serializeTransaction2(transaction, signature) {
  if (isDeposit(transaction))
    return serializeTransactionDeposit(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers = {
  transaction: serializeTransaction2
};
function serializeTransactionDeposit(transaction) {
  assertTransactionDeposit(transaction);
  const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
  const serializedTransaction = [
    sourceHash,
    from,
    to ?? "0x",
    mint ? toHex(mint) : "0x",
    value ? toHex(value) : "0x",
    gas ? toHex(gas) : "0x",
    isSystemTx ? "0x1" : "0x",
    data ?? "0x"
  ];
  return concatHex([
    "0x7e",
    toRlp(serializedTransaction)
  ]);
}
function isDeposit(transaction) {
  if (transaction.type === "deposit")
    return true;
  if (typeof transaction.sourceHash !== "undefined")
    return true;
  return false;
}
function assertTransactionDeposit(transaction) {
  const { from, to } = transaction;
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
}

// node_modules/viem/_esm/op-stack/chainConfig.js
var chainConfig = {
  blockTime: 2e3,
  contracts,
  formatters,
  serializers
};

// node_modules/viem/_esm/chains/definitions/arbitrum.js
init_defineChain();
var arbitrum = /* @__PURE__ */ defineChain({
  id: 42161,
  name: "Arbitrum One",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockTime: 250,
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
      apiUrl: "https://api.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
});

// node_modules/viem/_esm/chains/definitions/base.js
init_defineChain();
var sourceId = 1;
var base = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig.contracts,
    disputeGameFactory: {
      [sourceId]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [sourceId]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [sourceId]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId
});
var basePreconf = /* @__PURE__ */ defineChain({
  ...base,
  experimental_preconfirmationTime: 200,
  rpcUrls: {
    default: {
      http: ["https://mainnet-preconf.base.org"]
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mainnet.js
init_defineChain();
var mainnet = /* @__PURE__ */ defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockTime: 12e3,
  rpcUrls: {
    default: {
      http: ["https://ethereum.reth.rs/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensUniversalResolver: {
      address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
      blockCreated: 23085558
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// node_modules/viem/_esm/chains/definitions/optimism.js
init_defineChain();
var sourceId2 = 1;
var optimism = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io",
      apiUrl: "https://api-optimistic.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig.contracts,
    disputeGameFactory: {
      [sourceId2]: {
        address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9"
      }
    },
    l2OutputOracle: {
      [sourceId2]: {
        address: "0xdfe97868233d1aa22e815a266982f2cf17685a27"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4286263
    },
    portal: {
      [sourceId2]: {
        address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed"
      }
    },
    l1StandardBridge: {
      [sourceId2]: {
        address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
      }
    }
  },
  sourceId: sourceId2
});

// node_modules/viem/_esm/chains/definitions/polygon.js
init_defineChain();
var polygon = /* @__PURE__ */ defineChain({
  id: 137,
  name: "Polygon",
  blockTime: 2e3,
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon.drpc.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.etherscan.io/v2/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  }
});

// src/evm/chains.ts
var UNISWAP_V3_CANONICAL = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
var CHAINS = {
  base: {
    key: "base",
    name: "Base",
    chain: base,
    alchemyHost: "base-mainnet.g.alchemy.com",
    publicRpcs: ["https://mainnet.base.org", "https://base-rpc.publicnode.com", "https://1rpc.io/base"],
    nativeSymbol: "ETH",
    wrappedNative: { symbol: "WETH", address: "0x4200000000000000000000000000000000000006" },
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    nativeUsdFeed: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    uniswapV3Factory: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
    uniswapV2Factory: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6",
    uniswapV4PoolManager: "0x498581fF718922c3f8e6A244956aF099B2652b2b",
    solidly: { name: "aerodrome", factory: "0x420DD381b31aEf6683db6B902084cB0FFECe40Da" },
    l1DataFee: true,
    blockTimeSec: 0.2
  },
  eth: {
    key: "eth",
    name: "Ethereum",
    chain: mainnet,
    alchemyHost: "eth-mainnet.g.alchemy.com",
    // eth.llamarpc.com answered 525 on 2026-11-11; Tenderly's gateway serves eth_getLogs over hundreds of blocks (1rpc caps it at 50).
    publicRpcs: ["https://ethereum-rpc.publicnode.com", "https://mainnet.gateway.tenderly.co", "https://1rpc.io/eth"],
    nativeSymbol: "ETH",
    wrappedNative: { symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    nativeUsdFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    uniswapV3Factory: UNISWAP_V3_CANONICAL,
    uniswapV2Factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    uniswapV4PoolManager: "0x000000000004444c5dc75cB358380D2e3dE08A90",
    l1DataFee: false,
    blockTimeSec: 12
  },
  arbitrum: {
    key: "arbitrum",
    name: "Arbitrum One",
    chain: arbitrum,
    alchemyHost: "arb-mainnet.g.alchemy.com",
    publicRpcs: ["https://arb1.arbitrum.io/rpc", "https://arbitrum-one-rpc.publicnode.com"],
    nativeSymbol: "ETH",
    wrappedNative: { symbol: "WETH", address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1" },
    usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    nativeUsdFeed: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    uniswapV3Factory: UNISWAP_V3_CANONICAL,
    uniswapV2Factory: "0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9",
    uniswapV4PoolManager: "0x360E68faCcca8cA495c1B759Fd9EEe466db9FB32",
    l1DataFee: true,
    blockTimeSec: 0.33
  },
  optimism: {
    key: "optimism",
    name: "OP Mainnet",
    chain: optimism,
    alchemyHost: "opt-mainnet.g.alchemy.com",
    publicRpcs: ["https://mainnet.optimism.io", "https://optimism-rpc.publicnode.com"],
    nativeSymbol: "ETH",
    wrappedNative: { symbol: "WETH", address: "0x4200000000000000000000000000000000000006" },
    usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    nativeUsdFeed: "0x13e3Ee699D1909E989722E753853AE30b17e08c5",
    uniswapV3Factory: UNISWAP_V3_CANONICAL,
    uniswapV2Factory: "0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf",
    uniswapV4PoolManager: "0x9a13F98Cb987694C9F086b1F5eB990EeA8264Ec3",
    solidly: { name: "velodrome", factory: "0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a" },
    l1DataFee: true,
    blockTimeSec: 2
  },
  polygon: {
    key: "polygon",
    name: "Polygon PoS",
    chain: polygon,
    alchemyHost: "polygon-mainnet.g.alchemy.com",
    // polygon-rpc.com started answering 401 (needs a key): when publicnode was throttled, every /polygon/new-pools call failed
    // on it (2026-11-06 and 11-10). Both replacements served a 1,800-block eth_getLogs keyless on 2026-11-11.
    publicRpcs: ["https://polygon-bor-rpc.publicnode.com", "https://1rpc.io/matic", "https://polygon.gateway.tenderly.co"],
    nativeSymbol: "POL",
    wrappedNative: { symbol: "WPOL", address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" },
    usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    nativeUsdFeed: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
    uniswapV3Factory: UNISWAP_V3_CANONICAL,
    uniswapV2Factory: "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C",
    uniswapV4PoolManager: "0x67366782805870060151383F4BbFF9daB53e5cD6",
    l1DataFee: false,
    blockTimeSec: 1.5
  }
};
var erc20Abi = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function owner() view returns (address)"
]);

// src/history/deployer.ts
init_esm();

// src/history/logic.ts
var RECORDER_CHAINS = ["base", "eth", "arbitrum", "optimism", "polygon", "solana"];
var MIN_LIQUIDITY_USD = 1e3;
var MIGRATING_DEXES = ["meteora-dbc", "bags-fm"];
var UNKNOWN_MIGRATIONS_SQL = `UPDATE checks SET gone = NULL WHERE chain = ?1 AND pool_key IN (SELECT value FROM json_each(?2)) AND gone = 1 AND EXISTS (SELECT 1 FROM pools p WHERE p.chain = ?1 AND p.pool_key = checks.pool_key AND p.dex IN (${MIGRATING_DEXES.map((d) => `'${d}'`).join(", ")}))`;
var HOUR = 3600;
var DAY = 24 * HOUR;
var CHECKS = {
  // Windows must not overlap (RECHECK_SQL lists a pool once). "24h" closed at 3 days until "48h" came in (L4,
  // migration 0015, 2026-11-08); each run takes the freshest due checks first, so 24h readings land well inside a day.
  "24h": { after: DAY, until: 2 * DAY },
  "48h": { after: 2 * DAY, until: 4 * DAY },
  "7d": { after: 7 * DAY, until: 10 * DAY },
  // Slow rugs and quiet deaths come after a week (notes/data-moat-options.md D2; since 2026-10-27).
  "30d": { after: 30 * DAY, until: 33 * DAY }
};
var CHECK_KINDS = Object.keys(CHECKS);
function poolKey(chain2, idOrAddress) {
  return chain2 === "solana" ? idOrAddress : idOrAddress.toLowerCase();
}
function dedupe(rows) {
  const seen = /* @__PURE__ */ new Set();
  return rows.filter((r) => {
    const k = `${r.chain}
${r.pool_key}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
var BudgetUsed = class extends Error {
};
var POOL_COLUMNS = [
  "chain",
  "pool_key",
  "dex",
  "pool_address",
  "token_address",
  "token_symbol",
  "token_name",
  "token_decimals",
  "quote_address",
  "quote_symbol",
  "fee_tier_bps",
  "stable",
  "hooks",
  "created_block",
  "created_at",
  "created_tx",
  "first_seen",
  "liquidity_usd",
  "liquidity_basis",
  "price_usd"
];
var missing = (kind) => `NOT EXISTS (SELECT 1 FROM checks c WHERE c.chain = p.chain AND c.pool_key = p.pool_key AND c.kind = '${kind}')`;
var recheckBranch = (kind) => `SELECT p.chain, p.pool_key, p.token_address, p.first_seen, p.liquidity_usd, (SELECT group_concat(c.kind) FROM checks c WHERE c.chain = p.chain AND c.pool_key = p.pool_key) AS done, p.first_seen + ${CHECKS[kind].after} AS due_at FROM pools p WHERE p.chain = ? AND p.liquidity_usd >= ${MIN_LIQUIDITY_USD} AND p.first_seen <= ? AND p.first_seen > ? AND ${missing(kind)}`;
var RECHECK_SQL = CHECK_KINDS.map(recheckBranch).join(" UNION ALL ") + " ORDER BY due_at DESC LIMIT ?";
var SCORE_WINDOW = 2 * HOUR;

// src/history/deployer.ts
var PUMP_FUN = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";
var PUMP_SWAP = "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA";
var METEORA_DBC = "dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN";
var ZERO_KEY = "11111111111111111111111111111111";
var UNKNOWN = { deployer: null, via: null, source: null };
var key = (d, offset) => {
  if (d.length < offset + 32) return null;
  const k = base58.encode(d.subarray(offset, offset + 32));
  return k === ZERO_KEY ? null : k;
};
var found = (deployer, source) => deployer ? { deployer, via: null, source } : UNKNOWN;
function solanaCreator(owner, data, mint) {
  if (owner === PUMP_FUN) return found(key(data, 49), "pumpfun_curve");
  if (owner === PUMP_SWAP) {
    if (key(data, 43) !== mint && key(data, 75) !== mint) return UNKNOWN;
    const coinCreator = key(data, 211);
    return coinCreator ? found(coinCreator, "pumpswap_coin_creator") : found(key(data, 11), "pumpswap_pool_creator");
  }
  if (owner === METEORA_DBC && key(data, 136) === mint) return found(key(data, 104), "dbc_creator");
  return UNKNOWN;
}
var firstMintParams = (token2) => [
  {
    fromBlock: "0x0",
    toBlock: "latest",
    fromAddress: "0x0000000000000000000000000000000000000000",
    contractAddresses: [token2],
    category: ["erc20"],
    order: "asc",
    maxCount: "0x1",
    withMetadata: false
  }
];
function evmDeployer(tx) {
  if (!tx?.from) return UNKNOWN;
  return { deployer: tx.from.toLowerCase(), via: tx.to ? tx.to.toLowerCase() : null, source: "first_mint_tx" };
}
var UPDATE_COLUMNS = 5;
var ROWS_PER_UPDATE = Math.floor((100 - 1) / UPDATE_COLUMNS);
function deployerUpdates(chain2, rows, now) {
  const out = [];
  for (let i = 0; i < rows.length; i += ROWS_PER_UPDATE) {
    const batch = rows.slice(i, i + ROWS_PER_UPDATE);
    out.push({
      sql: `WITH v(pool_key, deployer, via, source, checked_at) AS (VALUES ${batch.map(() => "(?, ?, ?, ?, ?)").join(", ")}) UPDATE pools SET deployer = v.deployer, deployer_via = v.via, deployer_source = v.source, deployer_checked_at = v.checked_at FROM v WHERE pools.chain = ? AND pools.pool_key = v.pool_key`,
      params: [...batch.flatMap((r) => [r.pool_key, r.result.deployer, r.result.via, r.result.source, now]), chain2]
    });
  }
  return out;
}
var DEPLOYER_LOOKUPS_PER_RUN = 120;
var SOLANA_DEPLOYER_LOOKUPS_PER_RUN = 1e3;
var pendingDeployerQuery = (chain2, limit = chain2 === "solana" ? SOLANA_DEPLOYER_LOOKUPS_PER_RUN : DEPLOYER_LOOKUPS_PER_RUN) => ({
  sql: `SELECT pool_key, token_address, pool_address, dex FROM pools WHERE chain = ? AND deployer_checked_at IS NULL ORDER BY coalesce(liquidity_usd, 0) >= ${MIN_LIQUIDITY_USD} DESC, first_seen DESC LIMIT ?`,
  params: [chain2, limit]
});

// src/history/gecko.ts
var GT_API = "https://api.geckoterminal.com/api/v2";
var CG_ONCHAIN_API = "https://api.coingecko.com/api/v3/onchain";
var CG_CALLS_PER_RUN = 4;
function geckoSource(coingeckoKey) {
  return coingeckoKey ? { api: CG_ONCHAIN_API, headers: { "x-cg-demo-api-key": coingeckoKey }, maxCalls: CG_CALLS_PER_RUN } : { api: GT_API, headers: {}, maxCalls: Infinity };
}
var USER_AGENT = "agent-data-api-history-recorder/1.0 (+https://onchaincheck.dev)";
var GT_NETWORKS = {
  base: "base",
  eth: "eth",
  arbitrum: "arbitrum",
  optimism: "optimism",
  polygon: "polygon_pos",
  solana: "solana"
};
var PAGE_SIZE = 20;
var GT_GAP_MS = 4e3;
var RETRY_WAITS_MS = [15e3, 45e3];
var MAX_RETRY_AFTER_MS = 6e4;
function retryDelay(retryAfter, fallbackMs) {
  const secs = Number(retryAfter);
  const asked = retryAfter && Number.isFinite(secs) && secs > 0 ? secs * 1e3 : 0;
  return Math.min(Math.max(asked, fallbackMs), MAX_RETRY_AFTER_MS);
}
var RateLimited = class extends Error {
};
function geckoClient(f, gapMs = GT_GAP_MS, retryWaits = RETRY_WAITS_MS, source = geckoSource()) {
  let limited = false;
  let calls = 0;
  let retries = 0;
  let last = 0;
  async function get(path) {
    if (limited) throw new RateLimited("GeckoTerminal rate limit hit earlier in this run");
    const wait = last + gapMs - Date.now();
    if (calls > 0 && wait > 0) await new Promise((r2) => setTimeout(r2, wait));
    let r;
    for (let attempt = 0; ; attempt++) {
      if (calls >= source.maxCalls) throw new BudgetUsed(`${source.maxCalls} data API calls per run used`);
      last = Date.now();
      calls++;
      r = await f(`${source.api}${path}`, {
        headers: { accept: "application/json", "user-agent": USER_AGENT, ...source.headers },
        signal: AbortSignal.timeout(1e4)
      });
      if (r.status !== 429) break;
      await r.body?.cancel();
      if (attempt >= retryWaits.length) {
        limited = true;
        throw new RateLimited(`GeckoTerminal 429 on ${path.split("?")[0]} after ${attempt + 1} tries`);
      }
      retries++;
      await new Promise((ok) => setTimeout(ok, retryDelay(r.headers.get("retry-after"), retryWaits[attempt])));
    }
    if (!r.ok) {
      await r.body?.cancel();
      throw new Error(`GeckoTerminal ${path.split("?")[0]} -> HTTP ${r.status}`);
    }
    return await r.json();
  }
  return { get, calls: () => calls, retries: () => retries, limited: () => limited };
}
var newPoolsPath = (chain2, page) => `/networks/${GT_NETWORKS[chain2]}/new_pools?page=${page}&include=base_token,quote_token`;
function idAddress(chain2, id) {
  const prefix = `${GT_NETWORKS[chain2]}_`;
  if (!id?.startsWith(prefix)) return null;
  const a = id.slice(prefix.length);
  return chain2 === "solana" ? a : a.toLowerCase();
}
var num = (s) => {
  if (s === null || s === void 0 || s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};
var round2 = (n) => Math.round(n * 100) / 100;
var SOLANA_QUOTES = [
  "So11111111111111111111111111111111111111112",
  // wrapped SOL
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCE8BenwNYB"
  // USDT
];
function quoteSet(chain2) {
  if (chain2 === "solana") return new Set(SOLANA_QUOTES);
  const cfg = CHAINS[chain2];
  return new Set([cfg.wrappedNative.address, cfg.usdc, "0x0000000000000000000000000000000000000000"].map((a) => a.toLowerCase()));
}
function feeTierBps(name) {
  const m = name?.match(/\s(\d+(?:\.\d+)?)%$/);
  return m ? round2(Number(m[1]) * 100) : null;
}
var stopsRun = (e) => e instanceof RateLimited || e instanceof BudgetUsed;
function gtPoolRows(chain2, body, firstSeen, since) {
  const pools = body.data ?? [];
  const tokens = new Map((body.included ?? []).filter((t) => t.type === "token" && t.id).map((t) => [t.id, t.attributes ?? {}]));
  const quotes = quoteSet(chain2);
  const norm = (a) => chain2 === "solana" ? a : a.toLowerCase();
  const rows = [];
  let done = pools.length < PAGE_SIZE;
  for (const p of pools) {
    const a = p.attributes ?? {};
    const created = a.pool_created_at ? Math.floor(Date.parse(a.pool_created_at) / 1e3) : NaN;
    if (!a.address || !Number.isFinite(created)) continue;
    if (created < since) {
      done = true;
      continue;
    }
    let base2 = { id: p.relationships?.base_token?.data?.id, price: a.base_token_price_usd };
    let quote = { id: p.relationships?.quote_token?.data?.id, price: a.quote_token_price_usd };
    const baseAddr = idAddress(chain2, base2.id);
    const quoteAddr = idAddress(chain2, quote.id);
    if (!baseAddr) continue;
    if (quotes.has(norm(baseAddr)) && quoteAddr && !quotes.has(norm(quoteAddr))) [base2, quote] = [quote, base2];
    const token2 = tokens.get(base2.id) ?? {};
    const quoteToken = quote.id ? tokens.get(quote.id) ?? {} : {};
    const liquidity = num(a.reserve_in_usd);
    const price = num(base2.price);
    const isV4Id = chain2 !== "solana" && a.address.length === 66;
    rows.push({
      chain: chain2,
      pool_key: poolKey(chain2, a.address),
      dex: p.relationships?.dex?.data?.id ?? "unknown",
      pool_address: isV4Id ? null : a.address,
      token_address: idAddress(chain2, base2.id),
      token_symbol: token2.symbol ?? null,
      token_name: token2.name ?? null,
      token_decimals: typeof token2.decimals === "number" ? token2.decimals : null,
      quote_address: idAddress(chain2, quote.id),
      quote_symbol: quoteToken.symbol ?? null,
      fee_tier_bps: feeTierBps(a.name),
      stable: null,
      hooks: null,
      created_block: null,
      created_at: created,
      created_tx: null,
      first_seen: firstSeen,
      liquidity_usd: liquidity === null ? null : round2(liquidity),
      liquidity_basis: liquidity === null ? null : "gt_reserve",
      price_usd: price !== null && price > 0 ? price : null
    });
  }
  return { rows, done };
}
var NEW_POOL_PAGES = 5;
var GT_MAX_PAGES = 10;
var SCAN_SECONDS = 70 * 60;
async function newPoolRows(gt, chain2, now, pages = NEW_POOL_PAGES, since = now - SCAN_SECONDS) {
  const rows = [];
  let read = 0;
  try {
    for (let page = 1; page <= pages; page++) {
      const res = gtPoolRows(chain2, await gt.get(newPoolsPath(chain2, page)), now, since);
      read++;
      rows.push(...res.rows);
      if (res.done) break;
    }
  } catch (e) {
    if (!stopsRun(e) || read === 0) throw e;
  }
  return { rows, pages: read, limited: gt.limited() };
}

// src/rpc.ts
function jsonRpcCaller(urls, fetchImpl = fetch, opts = {}) {
  const attempts = opts.attempts ?? 3;
  const wait = opts.backoffMs ?? ((n) => 400 * 2 ** n);
  return async (method, params) => {
    let last;
    for (const url of urls) {
      for (let attempt = 0; attempt < attempts; attempt++) {
        try {
          const res = await fetchImpl(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
            signal: AbortSignal.timeout(1e4)
          });
          const body = await res.json().catch(() => null);
          if (res.ok && body && !body.error) return body.result;
          last = new Error(`${method}: ${body?.error?.message ?? `HTTP ${res.status}`}`);
          if (res.status !== 429 && res.status < 500 && body?.error?.code !== 429) break;
        } catch (e) {
          last = e;
        }
        if (attempt < attempts - 1) await new Promise((r) => setTimeout(r, wait(attempt)));
      }
    }
    throw last;
  };
}

// src/history/funder.ts
var notFound = (wallet, source = "not_found") => ({ wallet, funder: null, fundedAt: null, tx: null, amount: null, source });
var ex = (label) => ({ kind: "exchange", label });
var br = (label) => ({ kind: "bridge", label });
var KNOWN_EVM_FUNDERS = {
  // Coinbase
  "0x71660c4005ba85c37ccec55d0c4493e66fe775d3": ex("Coinbase 1"),
  "0x503828976d22510aad0201ac7ec88293211d23da": ex("Coinbase 2"),
  "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740": ex("Coinbase 3"),
  "0x3cd751e6b0078be393132286c442345e5dc49699": ex("Coinbase 4"),
  "0xb5d85cbf7cb3ee0d56b3bb207d5fc4b82f43f511": ex("Coinbase 5"),
  "0xeb2629a2734e272bcc07bda959863f316f4bd4cf": ex("Coinbase 6"),
  // Binance
  "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be": ex("Binance"),
  "0xd551234ae421e3bcba99a0da6d736074f22192ff": ex("Binance 2"),
  "0x564286362092d8e7936f0549571a803b203aaced": ex("Binance 3"),
  "0x0681d8db095565fe8a346fa0277bffde9c0edbbf": ex("Binance 4"),
  "0xfe9e8709d3215310075d67e3ed32a380ccf451c8": ex("Binance 5"),
  "0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67": ex("Binance 6"),
  "0xf977814e90da44bfa03b6295a0616a897441acec": ex("Binance 8"),
  "0x28c6c06298d514db089934071355e5743bf21d60": ex("Binance 14"),
  "0x21a31ee1afc51d94c2efccaa2092ad1028285549": ex("Binance 15"),
  "0xdfd5293d8e347dfe59e90efd55b2956a1343963d": ex("Binance 16"),
  "0x56eddb7aa87536c09ccc2793473599fd21a8b17f": ex("Binance 17"),
  "0x9696f59e4d72e237be84ffd425dcad154bf96976": ex("Binance 18"),
  "0x4976a4a02f38326660d17bf34b431dc6e2eb2327": ex("Binance 20"),
  // OKX, Kraken, Bybit, KuCoin, Gate, Crypto.com, MEXC
  "0x6cc5f688a315f3dc28a7781717a9a798a59fda7b": ex("OKX"),
  "0x236f9f97e0e62388479bf9e5ba4889e46b0273c3": ex("OKX 2"),
  "0xa7efae728d2936e78bda97dc267687568dd593f3": ex("OKX 3"),
  "0x2910543af39aba0cd09dbb2d50200b3e800a63d2": ex("Kraken"),
  "0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13": ex("Kraken 2"),
  "0xe853c56864a2ebe4576a807d26fdc4a0ada51919": ex("Kraken 3"),
  "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0": ex("Kraken 4"),
  "0xf89d7b9c864f589bbf53a82105107622b35eaa40": ex("Bybit"),
  "0xee5b5b923ffce93a870b3104b7ca09c3db80047a": ex("Bybit 2"),
  "0xd6216fc19db775df9774a6e33526131da7d19a2c": ex("KuCoin"),
  "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b91": ex("KuCoin 2"),
  "0x0d0707963952f2fba59dd06f2b425ace40b492fe": ex("Gate"),
  "0x6262998ced04146fa42253a5c0af90ca02dfd2a3": ex("Crypto.com"),
  "0x46340b20830761efd32832a74d7169b29feb9758": ex("Crypto.com 2"),
  "0x75e89d5979e4f6fba9f97c104c2f0afb3f1dcb88": ex("MEXC"),
  "0x4e5b2e1dc63f6b91cb6cd759936495434c7e972f": ex("FixedFloat"),
  // Bridges and their solvers
  "0xf70da97812cb96acdf810712aa562db8dfa3dbef": br("Relay solver"),
  "0x80c67432656d59144ceff962e8faf8926599bcf8": br("Orbiter Finance"),
  "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8": br("Orbiter Finance 2")
};
var KNOWN_SOLANA_FUNDERS = {
  H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS: ex("Coinbase 1"),
  "2AQdpHJ2JpcEgPiATUXjQxA8QmafFegfQwSLWSprPicm": ex("Coinbase 2"),
  GJRs4FwHtemZ5ZE9x3FNvJ8TMwitKTh21yxdRPqn7npE: ex("Coinbase 3"),
  "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM": ex("Binance 2"),
  "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9": ex("Binance"),
  // funded 3 of 145 sampled deployers (2026-11-05)
  "5VCwKtCXgCJ6kit5FybXjvriW3xELsFDhYrPSqtJNmcD": ex("OKX"),
  AC5RDfQFmDS1deWZos921JfqscXdByf8BKHs5ACWjtW2: ex("Bybit"),
  FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5: ex("Kraken"),
  ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ: ex("MEXC"),
  u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w: ex("Gate"),
  BmFdpraQhkiDQE6SnfG5omcA1VwzqfXrwtNYBwWTymy6: ex("KuCoin"),
  A77HErqtfN1hLLpvZ9pCtu66FEtM8BveoaKbbMoZ4RiR: ex("Bitget")
};
var knownFunder = (chain2, address) => (chain2 === "solana" ? KNOWN_SOLANA_FUNDERS[address] : KNOWN_EVM_FUNDERS[address.toLowerCase()]) ?? null;
var HUB_NONCE = 1e4;
var HUB_SIGNATURES = 1e3;
var HUB_WINDOW_SECONDS = 2 * 86400;
function funderKind(chain2, address, source, activity) {
  const known = knownFunder(chain2, address);
  if (known) return known;
  if (source === "alchemy_internal") return { kind: "contract", label: null };
  if (activity !== null && activity >= (chain2 === "solana" ? HUB_SIGNATURES : HUB_NONCE)) return { kind: "hub", label: null };
  return { kind: "wallet", label: null };
}
function solanaRecentSignatures(sigs, now) {
  return sigs.filter((s) => (s.blockTime ?? 0) > now - HUB_WINDOW_SECONDS).length;
}
var INTERNAL_CHAINS = ["eth", "polygon"];
var firstFundingParams = (chain2, wallet) => [
  {
    fromBlock: "0x0",
    toBlock: "latest",
    toAddress: wallet,
    category: INTERNAL_CHAINS.includes(chain2) ? ["external", "internal"] : ["external"],
    order: "asc",
    maxCount: "0x1",
    excludeZeroValue: true,
    withMetadata: true
  }
];
function evmFunding(wallet, transfers) {
  const t = transfers?.[0];
  if (!t?.from) return notFound(wallet);
  const at = t.metadata?.blockTimestamp ? Math.floor(Date.parse(t.metadata.blockTimestamp) / 1e3) : null;
  return {
    wallet,
    funder: t.from.toLowerCase(),
    fundedAt: Number.isFinite(at) ? at : null,
    tx: t.hash,
    amount: t.value ?? null,
    source: t.category === "internal" ? "alchemy_internal" : "alchemy_external"
  };
}
var SOLANA_PAGE = 1e3;
var SOLANA_MAX_PAGES = 2;
var SOLANA_TXS_TRIED = 2;
var SYSTEM_IN = {
  transfer: ["source", "destination"],
  transferWithSeed: ["source", "destination"],
  createAccount: ["source", "newAccount"],
  createAccountWithSeed: ["source", "newAccount"]
};
function solanaFunding(wallet, tx, signature) {
  if (!tx?.meta || tx.meta.err) return null;
  const msg = tx.transaction?.message;
  const keys = (msg?.accountKeys ?? []).map((k) => typeof k === "string" ? k : k.pubkey);
  const pre = tx.meta.preBalances ?? [];
  const post = tx.meta.postBalances ?? [];
  const delta = (i) => (post[i] ?? 0) - (pre[i] ?? 0);
  const at = tx.blockTime ?? null;
  const ixs = [...msg?.instructions ?? [], ...(tx.meta.innerInstructions ?? []).flatMap((x) => x.instructions)];
  for (const ix of ixs) {
    if (ix.program !== "system" || typeof ix.parsed !== "object" || !ix.parsed?.type) continue;
    const fields = SYSTEM_IN[ix.parsed.type];
    const info = ix.parsed.info ?? {};
    if (!fields || info[fields[1]] !== wallet || typeof info[fields[0]] !== "string" || info[fields[0]] === wallet) continue;
    const lamports = Number(info.lamports ?? 0);
    if (lamports <= 0) continue;
    return { wallet, funder: info[fields[0]], fundedAt: at, tx: signature, amount: lamports / 1e9, source: "solana_first_tx" };
  }
  const w = keys.indexOf(wallet);
  if (w < 0 || delta(w) <= 0) return null;
  let best = -1;
  keys.forEach((_, i) => {
    if (i !== w && delta(i) < 0 && (best < 0 || delta(i) < delta(best))) best = i;
  });
  return best < 0 ? null : { wallet, funder: keys[best], fundedAt: at, tx: signature, amount: delta(w) / 1e9, source: "solana_first_tx" };
}
var RELAYERS = ["0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789", "0x0000000071727de22e5e9d8baf0edac6f37da032", "0x4337084d9e255ff0702461cf8895ce9e3b5ff108"];
var NOT_RELAYED = `(p.deployer_via IS NULL OR p.deployer_via NOT IN (${RELAYERS.map((r) => `'${r}'`).join(", ")}))`;
var RECENT_POOL_ROWS = 5e3;
var recentPendingFundersQuery = (rows = RECENT_POOL_ROWS) => ({
  sql: "WITH p AS MATERIALIZED (SELECT chain, deployer, deployer_via, liquidity_usd FROM pools WHERE rowid > (SELECT max(rowid) FROM pools) - ? AND deployer IS NOT NULL) SELECT p.chain, p.deployer AS wallet, max(coalesce(p.liquidity_usd, 0)) AS liq FROM p WHERE " + NOT_RELAYED + " AND NOT EXISTS (SELECT 1 FROM deployer_funders f WHERE f.chain = p.chain AND f.wallet = p.deployer) GROUP BY p.chain, p.deployer ORDER BY liq DESC",
  params: [rows]
});
var knownFundersQuery = (chain2, addresses) => ({
  sql: "SELECT address FROM funders WHERE chain = ?1 AND address IN (SELECT value FROM json_each(?2))",
  params: [chain2, JSON.stringify(addresses)]
});
var FUNDING_COLUMNS = 8;
var FUNDER_COLUMNS = 6;
function fundingInserts(chain2, rows, now) {
  const out = [];
  const per = Math.floor(100 / FUNDING_COLUMNS);
  for (let i = 0; i < rows.length; i += per) {
    const b = rows.slice(i, i + per);
    out.push({
      sql: "INSERT OR REPLACE INTO deployer_funders (chain, wallet, funder, funded_at, funded_tx, amount, source, checked_at) VALUES " + b.map(() => "(?, ?, ?, ?, ?, ?, ?, ?)").join(", "),
      params: b.flatMap((r) => [chain2, r.wallet, r.funder, r.fundedAt, r.tx, r.amount, r.source, now])
    });
  }
  return out;
}
function funderInserts(chain2, rows, now) {
  const out = [];
  const per = Math.floor(100 / FUNDER_COLUMNS);
  for (let i = 0; i < rows.length; i += per) {
    const b = rows.slice(i, i + per);
    out.push({
      sql: "INSERT OR REPLACE INTO funders (chain, address, kind, label, activity, checked_at) VALUES " + b.map(() => "(?, ?, ?, ?, ?, ?)").join(", "),
      params: b.flatMap((r) => [chain2, r.address, r.kind, r.label, r.activity, now])
    });
  }
  return out;
}

// src/history/funder-lookup.ts
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
var jsonRpc = (url, fetchImpl = fetch) => jsonRpcCaller([url], fetchImpl, { backoffMs: (n) => 2e3 * (n + 1) });
async function evmFundingOf(rpc2, chain2, wallet) {
  const { transfers } = await rpc2("alchemy_getAssetTransfers", firstFundingParams(chain2, wallet));
  return evmFunding(wallet, transfers);
}
async function solanaFundingOf(rpc2, wallet, gapMs = 0) {
  let page = [];
  let before;
  let complete = false;
  for (let i = 0; i < SOLANA_MAX_PAGES; i++) {
    if (i) await sleep(gapMs);
    const sigs = await rpc2("getSignaturesForAddress", [wallet, { limit: SOLANA_PAGE, ...before && { before } }]);
    if (sigs.length) page = sigs;
    if (sigs.length < SOLANA_PAGE) {
      complete = true;
      break;
    }
    before = sigs[sigs.length - 1].signature;
  }
  if (!complete) return notFound(wallet, "too_many_txs");
  const oldest = page.filter((s) => !s.err).slice(-SOLANA_TXS_TRIED).reverse();
  for (const s of oldest) {
    await sleep(gapMs);
    const tx = await rpc2("getTransaction", [s.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 1, commitment: "confirmed" }]);
    const f = solanaFunding(wallet, tx, s.signature);
    if (f) return f;
  }
  return notFound(wallet);
}
async function funderActivity(rpc2, chain2, address, now) {
  if (chain2 === "solana") return solanaRecentSignatures(await rpc2("getSignaturesForAddress", [address, { limit: SOLANA_PAGE }]), now);
  return Number(BigInt(await rpc2("eth_getTransactionCount", [address, "latest"])));
}
async function funderPass(chain2, wallets, deps) {
  const { rpc: rpc2, d1, now, deadline, gapMs } = deps;
  const fundings = [];
  let failed2 = 0;
  let i = 0;
  for (; i < wallets.length && Date.now() < deadline; i++) {
    try {
      fundings.push(chain2 === "solana" ? await solanaFundingOf(rpc2, wallets[i], gapMs) : await evmFundingOf(rpc2, chain2, wallets[i]));
    } catch (e) {
      failed2++;
      deps.log?.(`funders: ${chain2} ${wallets[i]} failed: ${String(e?.message ?? e).slice(0, 200)}`);
    }
    await sleep(gapMs);
  }
  const found2 = fundings.filter((f) => f.funder);
  const distinct = [...new Map(found2.map((f) => [f.funder, f])).values()];
  const known = /* @__PURE__ */ new Set();
  for (let j = 0; j < distinct.length; j += 90) {
    const rows = await d1(knownFundersQuery(chain2, distinct.slice(j, j + 90).map((f) => f.funder)));
    rows.forEach((r) => known.add(r.address));
  }
  const funders = [];
  for (const f of distinct) {
    if (known.has(f.funder)) continue;
    let activity = null;
    if (!knownFunder(chain2, f.funder) && f.source !== "alchemy_internal") {
      try {
        activity = await funderActivity(rpc2, chain2, f.funder, now);
      } catch (e) {
        deps.log?.(`funders: ${chain2} activity of ${f.funder} failed: ${String(e?.message ?? e).slice(0, 200)}`);
      }
      await sleep(gapMs);
    }
    funders.push({ address: f.funder, ...funderKind(chain2, f.funder, f.source, activity), activity });
  }
  for (const q of [...funderInserts(chain2, funders, now), ...fundingInserts(chain2, fundings, now)]) await d1(q);
  return { looked: fundings.length, found: found2.length, newFunders: funders.length, failed: failed2, left: wallets.length - i };
}
var FUNDER_MS_EVM = 8e3;
var FUNDER_MS_SOLANA = 2e4;
var FUNDER_GAP_MS = 150;
async function recentFunderPass(d1, rpcFor, log = console.log) {
  const pending = await d1(recentPendingFundersQuery());
  const byChain = /* @__PURE__ */ new Map();
  for (const r of pending) byChain.set(r.chain, [...byChain.get(r.chain) ?? [], r.wallet]);
  for (const [chain2, wallets] of byChain) {
    const rpc2 = rpcFor(chain2);
    if (!rpc2) {
      log(`funders: ${chain2} skipped (no RPC)`);
      continue;
    }
    const deadline = Date.now() + (chain2 === "solana" ? FUNDER_MS_SOLANA : FUNDER_MS_EVM);
    try {
      const s = await funderPass(chain2, wallets, { rpc: rpc2, d1, now: Math.floor(Date.now() / 1e3), deadline, gapMs: FUNDER_GAP_MS, log });
      log(`funders: ${chain2} looked=${s.looked} found=${s.found} newFunders=${s.newFunders} failed=${s.failed} left=${s.left}`);
    } catch (e) {
      log(`funders: ${chain2} failed: ${String(e?.message ?? e).slice(0, 300)}`);
    }
  }
}
var SOLANA_PUBLIC_RPC = "https://api.mainnet-beta.solana.com";
function funderRpcFor(alchemyKey2, fetchImpl = fetch) {
  return (chain2) => {
    if (chain2 === "solana") return jsonRpc(alchemyKey2 ? `https://solana-mainnet.g.alchemy.com/v2/${alchemyKey2}` : SOLANA_PUBLIC_RPC, fetchImpl);
    const host = CHAINS[chain2]?.alchemyHost;
    return alchemyKey2 && host ? jsonRpc(`https://${host}/v2/${alchemyKey2}`, fetchImpl) : null;
  };
}

// scripts/history-discover.ts
var args = process.argv.slice(2);
var dry = args.includes("--dry");
var chains = args.filter((a) => RECORDER_CHAINS.includes(a));
var run = chains.length ? chains : RECORDER_CHAINS;
var { CLOUDFLARE_API_TOKEN: token, CF_ACCOUNT_ID: account, D1_DATABASE_ID: database, ALCHEMY_KEY: alchemyKey } = process.env;
if (!dry && !(token && account && database)) throw new Error("CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID and D1_DATABASE_ID are required (or pass --dry)");
var OVERLAP = 10 * 60;
var MAX_LOOKBACK = 12 * 3600;
var ROWS_PER_INSERT = Math.floor(100 / POOL_COLUMNS.length);
async function d1Query(sql, params) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ sql, params })
  });
  const body = await res.json();
  if (!res.ok || !body.success) throw new Error(`D1 query -> HTTP ${res.status}: ${body.errors?.map((e) => e.message).join("; ")}`);
  return { rows: body.result?.[0]?.results ?? [], changes: body.result?.[0]?.meta?.changes ?? 0 };
}
async function scanSince(chain2, now) {
  if (dry) return now - SCAN_SECONDS;
  const { rows } = await d1Query("SELECT max(created_at) AS newest FROM pools WHERE chain = ?", [chain2]);
  const newest = rows[0]?.newest;
  return Math.max(now - MAX_LOOKBACK, Math.min(now - SCAN_SECONDS, (newest ?? 0) - OVERLAP));
}
async function insertPools(rows) {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += ROWS_PER_INSERT) {
    const batch = rows.slice(i, i + ROWS_PER_INSERT);
    const values = batch.map(() => `(${POOL_COLUMNS.map(() => "?").join(", ")})`).join(", ");
    const params = batch.flatMap((r) => POOL_COLUMNS.map((c) => r[c] ?? null));
    inserted += (await d1Query(`INSERT OR IGNORE INTO pools (${POOL_COLUMNS.join(", ")}) VALUES ${values}`, params)).changes;
  }
  return inserted;
}
var SOLANA_RPC = "https://api.mainnet-beta.solana.com";
var SOLANA_GAP_MS = 500;
var EVM_CONCURRENCY = 1;
var EVM_GAP_MS = 150;
async function rpc(url, method, params) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }) });
    if (res.status === 429 && attempt < 2) {
      await new Promise((r) => setTimeout(r, 2e3 * (attempt + 1)));
      continue;
    }
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.error) throw new Error(`${method} -> HTTP ${res.status}: ${body.error?.message ?? ""}`.trim());
    return body.result;
  }
}
async function solanaDeployers(rows) {
  const out = rows.filter((r) => !r.pool_address).map((r) => ({ pool_key: r.pool_key, result: UNKNOWN }));
  const withAccount = rows.filter((r) => r.pool_address);
  for (let i = 0; i < withAccount.length; i += 100) {
    const batch = withAccount.slice(i, i + 100);
    if (i) await new Promise((r) => setTimeout(r, SOLANA_GAP_MS));
    let value;
    try {
      ({ value } = await rpc(SOLANA_RPC, "getMultipleAccounts", [batch.map((r) => r.pool_address), { encoding: "base64" }]));
    } catch (e) {
      console.error(`history-discover: solana deployers stopped after ${i} accounts: ${String(e?.message ?? e).slice(0, 200)}`);
      break;
    }
    batch.forEach((r, j) => {
      const a = value[j];
      out.push({ pool_key: r.pool_key, result: a ? solanaCreator(a.owner, Buffer.from(a.data[0], "base64"), r.token_address) : UNKNOWN });
    });
  }
  return out;
}
async function evmDeployers(chain2, rows) {
  const url = `https://${CHAINS[chain2].alchemyHost}/v2/${alchemyKey}`;
  const tokens = [...new Set(rows.map((r) => r.token_address.toLowerCase()))];
  const byToken = /* @__PURE__ */ new Map();
  const one = async (t) => {
    try {
      const { transfers } = await rpc(url, "alchemy_getAssetTransfers", firstMintParams(t));
      const tx = transfers[0] ? await rpc(url, "eth_getTransactionByHash", [transfers[0].hash]) : null;
      byToken.set(t, evmDeployer(tx));
    } catch (e) {
      console.error(`history-discover: ${chain2} deployer of ${t} failed: ${String(e?.message ?? e).slice(0, 200)}`);
    }
  };
  for (let i = 0; i < tokens.length; i += EVM_CONCURRENCY) {
    await Promise.all(tokens.slice(i, i + EVM_CONCURRENCY).map(one));
    await new Promise((r) => setTimeout(r, EVM_GAP_MS));
  }
  return rows.flatMap((r) => {
    const result = byToken.get(r.token_address.toLowerCase());
    return result ? [{ pool_key: r.pool_key, result }] : [];
  });
}
async function lookupDeployers(chain2, now) {
  if (dry) return;
  if (chain2 !== "solana" && !alchemyKey) return console.log(`history-discover: ${chain2} deployers skipped (no ALCHEMY_KEY)`);
  const pending = pendingDeployerQuery(chain2);
  const { rows } = await d1Query(pending.sql, pending.params);
  if (!rows.length) return;
  const lookups = chain2 === "solana" ? await solanaDeployers(rows) : await evmDeployers(chain2, rows);
  for (const u of deployerUpdates(chain2, lookups, now)) await d1Query(u.sql, u.params);
  console.log(`history-discover: ${chain2} deployers looked=${lookups.length} found=${lookups.filter((l) => l.result.deployer).length} of ${rows.length}`);
}
var failed = 0;
for (const chain2 of run) {
  const now = Math.floor(Date.now() / 1e3);
  const gt = geckoClient(fetch, GT_GAP_MS, RETRY_WAITS_MS);
  try {
    const since = await scanSince(chain2, now);
    const scan = await newPoolRows(gt, chain2, now, GT_MAX_PAGES, since);
    const rows = dedupe(scan.rows);
    const liquid = rows.filter((r) => (r.liquidity_usd ?? 0) >= 1e3).length;
    const inserted = dry ? 0 : await insertPools(rows);
    console.log(`history-discover: ${chain2} seen=${rows.length} liquid=${liquid} new=${inserted} back=${Math.round((now - since) / 60)}m pages=${scan.pages} gt=${gt.calls()} retries=${gt.retries()}${gt.limited() ? " rate-limited" : ""}${dry ? " dry" : ""}`);
  } catch (e) {
    failed++;
    console.error(`history-discover: ${chain2} failed: ${String(e?.message ?? e).slice(0, 300)}`);
  }
  await lookupDeployers(chain2, now).catch((e) => console.error(`history-discover: ${chain2} deployers failed: ${String(e?.message ?? e).slice(0, 300)}`));
}
if (!dry && process.env.FUNDER_PASS === "1") await recentFunderPass((q) => d1Query(q.sql, q.params).then((r) => r.rows), funderRpcFor(alchemyKey)).catch((e) => console.error(`history-discover: funders failed: ${String(e?.message ?? e).slice(0, 300)}`));
if (failed === run.length) process.exit(1);
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
