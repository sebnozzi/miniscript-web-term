"use strict";
var MSTerm = (() => {
  // ../miniscript.ts/dist/miniscript-ts.mjs
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var TokenType = /* @__PURE__ */ ((TokenType2) => {
    TokenType2[TokenType2["NEWLINE"] = 0] = "NEWLINE";
    TokenType2[TokenType2["SEMICOLON"] = 1] = "SEMICOLON";
    TokenType2[TokenType2["STRING_LITERAL"] = 2] = "STRING_LITERAL";
    TokenType2[TokenType2["INT_LITERAL"] = 3] = "INT_LITERAL";
    TokenType2[TokenType2["FLOAT_LITERAL"] = 4] = "FLOAT_LITERAL";
    TokenType2[TokenType2["IDENTIFIER_TK"] = 5] = "IDENTIFIER_TK";
    TokenType2[TokenType2["OPEN_CURLY"] = 6] = "OPEN_CURLY";
    TokenType2[TokenType2["OPEN_SQUARE"] = 7] = "OPEN_SQUARE";
    TokenType2[TokenType2["OPEN_ROUND"] = 8] = "OPEN_ROUND";
    TokenType2[TokenType2["CLOSE_CURLY"] = 9] = "CLOSE_CURLY";
    TokenType2[TokenType2["CLOSE_SQUARE"] = 10] = "CLOSE_SQUARE";
    TokenType2[TokenType2["CLOSE_ROUND"] = 11] = "CLOSE_ROUND";
    TokenType2[TokenType2["DOT"] = 12] = "DOT";
    TokenType2[TokenType2["COLON"] = 13] = "COLON";
    TokenType2[TokenType2["COMMA"] = 14] = "COMMA";
    TokenType2[TokenType2["ASSIGN"] = 15] = "ASSIGN";
    TokenType2[TokenType2["PLUS_ASSIGN"] = 16] = "PLUS_ASSIGN";
    TokenType2[TokenType2["MINUS_ASSIGN"] = 17] = "MINUS_ASSIGN";
    TokenType2[TokenType2["MULT_ASSIGN"] = 18] = "MULT_ASSIGN";
    TokenType2[TokenType2["DIV_ASSIGN"] = 19] = "DIV_ASSIGN";
    TokenType2[TokenType2["MOD_ASSIGN"] = 20] = "MOD_ASSIGN";
    TokenType2[TokenType2["POW_ASSIGN"] = 21] = "POW_ASSIGN";
    TokenType2[TokenType2["OP_EQUALS"] = 22] = "OP_EQUALS";
    TokenType2[TokenType2["OP_NOT_EQUALS"] = 23] = "OP_NOT_EQUALS";
    TokenType2[TokenType2["OP_OR"] = 24] = "OP_OR";
    TokenType2[TokenType2["OP_AND"] = 25] = "OP_AND";
    TokenType2[TokenType2["OP_LESS"] = 26] = "OP_LESS";
    TokenType2[TokenType2["OP_LESS_EQUALS"] = 27] = "OP_LESS_EQUALS";
    TokenType2[TokenType2["OP_GREATER"] = 28] = "OP_GREATER";
    TokenType2[TokenType2["OP_GREATER_EQUALS"] = 29] = "OP_GREATER_EQUALS";
    TokenType2[TokenType2["OP_PLUS"] = 30] = "OP_PLUS";
    TokenType2[TokenType2["OP_MINUS"] = 31] = "OP_MINUS";
    TokenType2[TokenType2["OP_MOD"] = 32] = "OP_MOD";
    TokenType2[TokenType2["OP_DIV"] = 33] = "OP_DIV";
    TokenType2[TokenType2["OP_MULT"] = 34] = "OP_MULT";
    TokenType2[TokenType2["OP_POW"] = 35] = "OP_POW";
    TokenType2[TokenType2["OP_NOT"] = 36] = "OP_NOT";
    TokenType2[TokenType2["OP_FUNCREF"] = 37] = "OP_FUNCREF";
    TokenType2[TokenType2["OP_ISA"] = 38] = "OP_ISA";
    TokenType2[TokenType2["KW_TRUE"] = 39] = "KW_TRUE";
    TokenType2[TokenType2["KW_FALSE"] = 40] = "KW_FALSE";
    TokenType2[TokenType2["KW_NULL"] = 41] = "KW_NULL";
    TokenType2[TokenType2["KW_SUPER"] = 42] = "KW_SUPER";
    TokenType2[TokenType2["KW_IF"] = 43] = "KW_IF";
    TokenType2[TokenType2["KW_THEN"] = 44] = "KW_THEN";
    TokenType2[TokenType2["KW_ELSE"] = 45] = "KW_ELSE";
    TokenType2[TokenType2["KW_ELSE_IF"] = 46] = "KW_ELSE_IF";
    TokenType2[TokenType2["KW_WHILE"] = 47] = "KW_WHILE";
    TokenType2[TokenType2["KW_FOR"] = 48] = "KW_FOR";
    TokenType2[TokenType2["KW_IN"] = 49] = "KW_IN";
    TokenType2[TokenType2["KW_BREAK"] = 50] = "KW_BREAK";
    TokenType2[TokenType2["KW_CONTINUE"] = 51] = "KW_CONTINUE";
    TokenType2[TokenType2["KW_NEW"] = 52] = "KW_NEW";
    TokenType2[TokenType2["KW_FUNCTION"] = 53] = "KW_FUNCTION";
    TokenType2[TokenType2["KW_RETURN"] = 54] = "KW_RETURN";
    TokenType2[TokenType2["KW_END"] = 55] = "KW_END";
    TokenType2[TokenType2["KW_END_IF"] = 56] = "KW_END_IF";
    TokenType2[TokenType2["KW_END_FOR"] = 57] = "KW_END_FOR";
    TokenType2[TokenType2["KW_END_WHILE"] = 58] = "KW_END_WHILE";
    TokenType2[TokenType2["KW_END_FUNCTION"] = 59] = "KW_END_FUNCTION";
    TokenType2[TokenType2["EOF"] = 60] = "EOF";
    return TokenType2;
  })(TokenType || {});
  function toOfficialImplTokenName(tokenType) {
    switch (tokenType) {
      case 14:
        return "Comma";
      case 8:
        return "LParen";
      case 11:
        return "RParen";
      default:
        TokenType[tokenType];
        return `${TokenType[tokenType]}`;
    }
  }
  function toJsonArray(elements) {
    let result = [];
    for (let e of elements) {
      result.push(e.toJson());
    }
    return result;
  }
  function tokensToJsonArray(tokens) {
    let result = [];
    for (let token of tokens) {
      const tokenType = token.tokenType;
      result.push(TokenType[tokenType].toString());
    }
    return result;
  }
  var ExpressionStatement = class {
    constructor(expression) {
      this.expression = expression;
    }
    location() {
      return this.expression.location();
    }
    description() {
      return "Expression Statement";
    }
    toJson() {
      return {
        "ExpressionStatement": {
          "expression": this.expression.toJson()
        }
      };
    }
  };
  var ConditionedStatements = class {
    constructor(condition, statements) {
      this.condition = condition;
      this.statements = statements;
    }
    location() {
      return this.condition.location();
    }
    toJson() {
      return {
        "ConditionedStatements": {
          "condition": this.condition.toJson(),
          "statements": toJsonArray(this.statements)
        }
      };
    }
  };
  var IfStatement = class {
    constructor(ifBranch, elseIfs, elseBranch) {
      this.ifBranch = ifBranch;
      this.elseIfs = elseIfs;
      this.elseBranch = elseBranch;
    }
    description() {
      return "If Statement";
    }
    toJson() {
      return {
        "IfStatement": {
          "ifBranch": this.ifBranch.toJson(),
          "elseIfs": toJsonArray(this.elseIfs),
          "elseBranch": toJsonArray(this.elseBranch)
        }
      };
    }
  };
  var WhileStatement = class {
    constructor(condition, headerLocation, statements) {
      this.condition = condition;
      this.headerLocation = headerLocation;
      this.statements = statements;
    }
    description() {
      return "While Statement";
    }
    toJson() {
      return {
        "WhileStatement": {
          "condition": this.condition.toJson(),
          "statements": toJsonArray(this.statements)
        }
      };
    }
  };
  var ForStatement = class {
    constructor(loopVar, rangeExpr, headerLocation, statements) {
      this.loopVar = loopVar;
      this.rangeExpr = rangeExpr;
      this.headerLocation = headerLocation;
      this.statements = statements;
    }
    description() {
      return "For Statement";
    }
    toJson() {
      return {
        "ForStatement": {
          "loopVar": this.loopVar.value,
          "rangeExpr": this.rangeExpr.toJson(),
          "statements": toJsonArray(this.statements)
        }
      };
    }
  };
  var AssignmentStatement = class {
    constructor(target, value) {
      this.target = target;
      this.value = value;
    }
    description() {
      return "Assignment";
    }
    location() {
      return this.target.location().upTo(this.value.location());
    }
    toJson() {
      return {
        "AssignmentStatement": {
          "target": this.target.toJson(),
          "value": this.value.toJson()
        }
      };
    }
  };
  var MathAssignmentStatement = class {
    constructor(target, opToken, value) {
      this.target = target;
      this.opToken = opToken;
      this.value = value;
    }
    description() {
      return "Math-Assignment";
    }
    location() {
      return this.target.location().upTo(this.value.location());
    }
    toJson() {
      return {
        "MathAssignmentStatement": {
          "target": this.target.toJson(),
          "op": TokenType[this.opToken],
          "value": this.value.toJson()
        }
      };
    }
  };
  var FunctionCallStatement = class {
    constructor(callTarget, args) {
      this.callTarget = callTarget;
      this.args = args;
    }
    description() {
      return "Function Call Statement";
    }
    location() {
      if (this.args.length > 0) {
        const lastArg = this.args[this.args.length - 1];
        return this.callTarget.location().upTo(lastArg.location());
      } else {
        return this.callTarget.location();
      }
    }
    toJson() {
      return {
        "FunctionCallStatement": {
          "callTarget": this.callTarget.toJson(),
          "args": toJsonArray(this.args)
        }
      };
    }
  };
  var ReturnStatement = class {
    constructor(optValue, fullLocation) {
      this.optValue = optValue;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Return Statement";
    }
    toJson() {
      return {
        "ReturnStatement": {
          "optValue": this.optValue ? this.optValue.toJson() : null
        }
      };
    }
  };
  var BreakStatement = class {
    constructor(fullLocation) {
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Break Statement";
    }
    toJson() {
      return {
        "BreakStatement": null
      };
    }
  };
  var ContinueStatement = class {
    constructor(fullLocation) {
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Continue Statement";
    }
    toJson() {
      return {
        "ContinueStatement": null
      };
    }
  };
  var BinaryExpr = class {
    constructor(left, operator, right) {
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
    location() {
      return this.left.location().upTo(this.right.location());
    }
    description() {
      return "Binary Expression";
    }
    toJson() {
      return {
        "BinaryExpr": {
          "left": this.left.toJson(),
          "operator": TokenType[this.operator.tokenType],
          "right": this.right.toJson()
        }
      };
    }
  };
  var ChainedComparisonExpr = class {
    constructor(operands, operators) {
      this.operands = operands;
      this.operators = operators;
      if (operands.length < 3) {
        throw new Error("Amount of operands must be at least 3");
      }
      if (operands.length - 1 != operators.length) {
        throw new Error("Amount of operands/operators mismatch");
      }
      for (let tk of operators) {
        const ttype = tk.tokenType;
        if (ttype != TokenType.OP_EQUALS && ttype != TokenType.OP_NOT_EQUALS && ttype != TokenType.OP_GREATER && ttype != TokenType.OP_GREATER_EQUALS && ttype != TokenType.OP_LESS && ttype != TokenType.OP_LESS_EQUALS) {
          throw new Error(`Invalid token type: ${TokenType[ttype]}`);
        }
      }
    }
    location() {
      const firstOperand = this.operands[0];
      const lastOperand = this.operands[this.operands.length - 1];
      return firstOperand.location().upTo(lastOperand.location());
    }
    description() {
      return "Binary Expression";
    }
    toJson() {
      return {
        "ChainedComparison": {
          "operands": toJsonArray(this.operands),
          "operators": tokensToJsonArray(this.operators)
        }
      };
    }
  };
  var LogicExpr = class {
    constructor(left, operator, right) {
      this.left = left;
      this.operator = operator;
      this.right = right;
    }
    location() {
      return this.left.location().upTo(this.right.location());
    }
    description() {
      return "Logic Expression";
    }
    toJson() {
      return {
        "LogicExpr": {
          "left": this.left.toJson(),
          "operator": TokenType[this.operator.tokenType],
          "right": this.right.toJson()
        }
      };
    }
  };
  var UnaryExpr = class {
    constructor(operator, expr) {
      this.operator = operator;
      this.expr = expr;
    }
    location() {
      return this.operator.location.upTo(this.expr.location());
    }
    description() {
      return "Unary Expression";
    }
    toJson() {
      return {
        "UnaryExpr": {
          "operator": TokenType[this.operator.tokenType],
          "expr": this.expr.toJson()
        }
      };
    }
  };
  var Literal = class {
    constructor(value, fullLocation) {
      this.value = value;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Literal";
    }
    toJson() {
      return {
        "Literal": {
          "value": this.value
        }
      };
    }
  };
  var GroupingExpr = class {
    constructor(expr, fullLocation) {
      this.expr = expr;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Grouping Expression";
    }
    toJson() {
      return {
        "GroupingExpr": {
          "expr": this.expr.toJson()
        }
      };
    }
  };
  var IdentifierExpr = class {
    constructor(identifier) {
      this.identifier = identifier;
    }
    location() {
      return this.identifier.location;
    }
    description() {
      return "Identifier";
    }
    toJson() {
      return {
        "IdentifierExpr": {
          "identifier": this.identifier.value
        }
      };
    }
  };
  var FunctionCallExpr = class {
    constructor(callTarget, args, fullLocation) {
      this.callTarget = callTarget;
      this.args = args;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Function Call Expression";
    }
    toJson() {
      return {
        "FunctionCallExpr": {
          "callTarget": this.callTarget.toJson(),
          "args": toJsonArray(this.args)
        }
      };
    }
  };
  var ListExpr = class {
    constructor(elements, fullLocation) {
      this.elements = elements;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "List Expression";
    }
    toJson() {
      return {
        "ListExpr": {
          "elements": toJsonArray(this.elements)
        }
      };
    }
  };
  var MapExpr = class {
    constructor(elements, fullLocation) {
      this.elements = elements;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Map Expression";
    }
    toJson() {
      const entries = [];
      for (let [key, value] of this.elements) {
        entries.push({ "key": key, "value": value });
      }
      return {
        "MapExpr": {
          "elements": entries
        }
      };
    }
  };
  var IndexedAccessExpr = class {
    constructor(accessTarget, indexExpr, fullLocation) {
      this.accessTarget = accessTarget;
      this.indexExpr = indexExpr;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Indexed Access";
    }
    toJson() {
      return {
        "IndexedAccessExpr": {
          "accessTarget": this.accessTarget.toJson(),
          "indexExpr": this.indexExpr.toJson()
        }
      };
    }
  };
  var ListSlicingExpr = class {
    constructor(listTarget, start, stop, fullLocation) {
      this.listTarget = listTarget;
      this.start = start;
      this.stop = stop;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "List Slicing";
    }
    toJson() {
      return {
        "ListSlicingExpr": {
          "listTarget": this.listTarget.toJson(),
          "start": this.start ? this.start.toJson() : void 0,
          "stop": this.stop ? this.stop.toJson() : void 0
        }
      };
    }
  };
  var DotAccessExpr = class {
    constructor(accessTarget, property) {
      this.accessTarget = accessTarget;
      this.property = property;
    }
    location() {
      return this.accessTarget.location().upTo(this.property.location);
    }
    description() {
      return "Property Access";
    }
    toJson() {
      return {
        "DotAccessExpr": {
          "accessTarget": this.accessTarget.toJson(),
          "property": this.property.value
        }
      };
    }
  };
  var Argument = class {
    constructor(name, defaultValue, fullLocation) {
      this.name = name;
      this.defaultValue = defaultValue;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    toJson() {
      return {
        "Argument": {
          "name": this.name,
          "defaultValue": this.defaultValue ? this.defaultValue.toJson() : "(undefined)"
        }
      };
    }
  };
  var FunctionBodyExpr = class {
    constructor(args, statements, fullLocation) {
      this.args = args;
      this.statements = statements;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Function Body";
    }
    toJson() {
      return {
        "FunctionBodyExpr": {
          "args": toJsonArray(this.args),
          "statements": toJsonArray(this.statements)
        }
      };
    }
  };
  var FunctionRefExpr = class {
    constructor(refTarget, fullLocation) {
      this.refTarget = refTarget;
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Function Reference";
    }
    toJson() {
      return {
        "FunctionRefExpr": {
          "refTarget": this.refTarget.toJson()
        }
      };
    }
  };
  var SelfExpr = class {
    constructor(fullLocation) {
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Self Expression";
    }
    toJson() {
      return {
        "SelfExpr": {}
      };
    }
  };
  var SuperExpr = class {
    constructor(fullLocation) {
      this.fullLocation = fullLocation;
    }
    location() {
      return this.fullLocation;
    }
    description() {
      return "Super Expression";
    }
    toJson() {
      return {
        "SuperExpr": {}
      };
    }
  };
  var BC = /* @__PURE__ */ ((BC2) => {
    BC2[BC2["PUSH"] = 0] = "PUSH";
    BC2[BC2["EVAL_ID"] = 1] = "EVAL_ID";
    BC2[BC2["INDEXED_ACCESS"] = 2] = "INDEXED_ACCESS";
    BC2[BC2["DOT_ACCESS"] = 3] = "DOT_ACCESS";
    BC2[BC2["SUPER_DOT_ACCESS"] = 4] = "SUPER_DOT_ACCESS";
    BC2[BC2["SLICE_SEQUENCE"] = 5] = "SLICE_SEQUENCE";
    BC2[BC2["ASSIGN_LOCAL"] = 6] = "ASSIGN_LOCAL";
    BC2[BC2["ASSIGN_INDEXED"] = 7] = "ASSIGN_INDEXED";
    BC2[BC2["DOT_ASSIGN"] = 8] = "DOT_ASSIGN";
    BC2[BC2["MATH_ASSIGN_LOCAL"] = 9] = "MATH_ASSIGN_LOCAL";
    BC2[BC2["MATH_ASSIGN_INDEXED"] = 10] = "MATH_ASSIGN_INDEXED";
    BC2[BC2["MATH_DOT_ASSIGN"] = 11] = "MATH_DOT_ASSIGN";
    BC2[BC2["ADD_VALUES"] = 12] = "ADD_VALUES";
    BC2[BC2["SUBTRACT_VALUES"] = 13] = "SUBTRACT_VALUES";
    BC2[BC2["MULTIPLY_VALUES"] = 14] = "MULTIPLY_VALUES";
    BC2[BC2["DIVIDE_VALUES"] = 15] = "DIVIDE_VALUES";
    BC2[BC2["POWER_VALUES"] = 16] = "POWER_VALUES";
    BC2[BC2["MOD_VALUES"] = 17] = "MOD_VALUES";
    BC2[BC2["SUBTR_N"] = 18] = "SUBTR_N";
    BC2[BC2["DIVIDE_N"] = 19] = "DIVIDE_N";
    BC2[BC2["LOGIC_AND_VALUES"] = 20] = "LOGIC_AND_VALUES";
    BC2[BC2["LOGIC_OR_VALUES"] = 21] = "LOGIC_OR_VALUES";
    BC2[BC2["NEGATE_BOOLEAN"] = 22] = "NEGATE_BOOLEAN";
    BC2[BC2["NEGATE_NUMBER"] = 23] = "NEGATE_NUMBER";
    BC2[BC2["COMPARE_EQ"] = 24] = "COMPARE_EQ";
    BC2[BC2["COMPARE_NE"] = 25] = "COMPARE_NE";
    BC2[BC2["COMPARE_GE"] = 26] = "COMPARE_GE";
    BC2[BC2["COMPARE_GT"] = 27] = "COMPARE_GT";
    BC2[BC2["COMPARE_LE"] = 28] = "COMPARE_LE";
    BC2[BC2["COMPARE_LT"] = 29] = "COMPARE_LT";
    BC2[BC2["COMPARE_ISA"] = 30] = "COMPARE_ISA";
    BC2[BC2["BUILD_LIST"] = 31] = "BUILD_LIST";
    BC2[BC2["BUILD_MAP"] = 32] = "BUILD_MAP";
    BC2[BC2["NEW_MAP"] = 33] = "NEW_MAP";
    BC2[BC2["CHAINED_COMPARISON"] = 34] = "CHAINED_COMPARISON";
    BC2[BC2["JUMP"] = 35] = "JUMP";
    BC2[BC2["POP_JUMP_FALSE"] = 36] = "POP_JUMP_FALSE";
    BC2[BC2["JUMP_IF_FALSE"] = 37] = "JUMP_IF_FALSE";
    BC2[BC2["JUMP_IF_TRUE"] = 38] = "JUMP_IF_TRUE";
    BC2[BC2["CALL"] = 39] = "CALL";
    BC2[BC2["PROPERTY_CALL"] = 40] = "PROPERTY_CALL";
    BC2[BC2["SUPER_DOT_CALL"] = 41] = "SUPER_DOT_CALL";
    BC2[BC2["FUNCREF_CALL"] = 42] = "FUNCREF_CALL";
    BC2[BC2["RETURN"] = 43] = "RETURN";
    BC2[BC2["POP"] = 44] = "POP";
    BC2[BC2["PRINT_TOP"] = 45] = "PRINT_TOP";
    BC2[BC2["CREATE_FOR_LOOP"] = 46] = "CREATE_FOR_LOOP";
    BC2[BC2["ITERATE_FOR_LOOP"] = 47] = "ITERATE_FOR_LOOP";
    BC2[BC2["BREAK_FOR_LOOP"] = 48] = "BREAK_FOR_LOOP";
    BC2[BC2["CONTINUE_FOR_LOOP"] = 49] = "CONTINUE_FOR_LOOP";
    return BC2;
  })(BC || {});
  function hasCallPotential(op) {
    return op === 39 || op === 40 || op === 3 || op === 42 || op === 1 || op === 2 || op === 4;
  }
  var FuncDefArg = class {
    constructor(name, defaultValue) {
      __publicField(this, "name");
      __publicField(this, "defaultValue");
      this.name = name;
      this.defaultValue = defaultValue;
    }
  };
  var FuncDef = class {
    // The "default values" array has to have the same length s "arg-names".
    // Pass "undefined" as the value if it has NO default value.
    constructor(args, code) {
      __publicField(this, "arguments");
      __publicField(this, "argNames");
      __publicField(this, "reversedArgNames");
      __publicField(this, "effectiveDefaultValues");
      __publicField(this, "code");
      this.arguments = args;
      this.argNames = args.map((a) => a.name);
      this.reversedArgNames = this.argNames.slice().reverse();
      this.effectiveDefaultValues = args.map((a) => a.defaultValue === void 0 ? null : a.defaultValue);
      this.code = code;
    }
    getLastNEffectiveDefaultValues(amount) {
      return this.effectiveDefaultValues.slice(-amount);
    }
    isNative() {
      return this.code instanceof Function;
    }
    getCode() {
      return this.code;
    }
    getFunction() {
      return this.code;
    }
  };
  var BoundFunction = class {
    constructor(funcDef, context) {
      __publicField(this, "funcDef");
      __publicField(this, "context");
      this.funcDef = funcDef;
      this.context = context;
    }
  };
  var SourceMap = class {
    constructor(srcFile) {
      __publicField(this, "entries");
      this.srcFile = srcFile;
      this.entries = [];
    }
    pushEntry(ipStart, ipEnd, srcLoc, isCall = false) {
      const entry = {
        ipStart,
        ipEnd,
        srcLoc,
        isCall
      };
      this.entries.push(entry);
    }
    pushCall(ipStart, ipEnd, srcLoc) {
      this.pushEntry(ipStart, ipEnd, srcLoc, true);
    }
    findEntry(ip) {
      for (let entry of this.entries) {
        if (ip >= entry.ipStart && ip <= entry.ipEnd) {
          return entry;
        }
      }
      return null;
    }
  };
  var Code = class {
    constructor() {
      __publicField(this, "opCodes");
      __publicField(this, "debugLines");
      __publicField(this, "arg1");
      __publicField(this, "arg2");
      __publicField(this, "srcMap");
      this.opCodes = [];
      this.debugLines = [];
      this.arg1 = [];
      this.arg2 = [];
      this.srcMap = new SourceMap();
    }
    push(opCode, arg1 = void 0, arg2 = void 0) {
      this.opCodes.push(opCode);
      this.arg1.push(arg1);
      this.arg2.push(arg2);
      this.pushDebugLine(opCode, arg1, arg2);
    }
    pushDebugLine(opCode, arg1, arg2) {
      const debugCode = [BC[opCode]];
      if (arg1 !== void 0)
        debugCode.push(arg1);
      if (arg2 !== void 0)
        debugCode.push(arg2);
      this.debugLines.push(debugCode);
    }
  };
  var AddrLabel = class {
    constructor(idx) {
      this.idx = idx;
    }
  };
  var CodeBuilder = class {
    constructor(srcFile) {
      __publicField(this, "prg");
      __publicField(this, "ip");
      __publicField(this, "addresses");
      __publicField(this, "unresolvedIdx", 0);
      __publicField(this, "unresolved");
      __publicField(this, "srcMapIpStart");
      __publicField(this, "srcMap");
      this.srcFile = srcFile;
      this.prg = new Code();
      this.ip = 0;
      this.addresses = /* @__PURE__ */ new Map();
      this.unresolved = [];
      this.srcMapIpStart = -1;
      this.srcMap = new SourceMap(srcFile);
    }
    push(opCode, arg1 = void 0, arg2 = void 0) {
      this.prg.push(opCode, arg1, arg2);
      this.ip++;
    }
    push_unresolved(opCode, arg1 = void 0, arg2 = void 0) {
      if (!(arg1 instanceof AddrLabel) && !(arg2 instanceof AddrLabel)) {
        throw new Error("Expected one of the parameters to be an address label");
      }
      this.prg.push(opCode, arg1, arg2);
      this.unresolved.push(this.ip);
      this.ip++;
    }
    newLabel() {
      const addLabel = new AddrLabel(this.unresolvedIdx);
      this.unresolvedIdx += 1;
      return addLabel;
    }
    startMapEntry() {
      this.srcMapIpStart = this.ip;
    }
    endMapEntry(srcLoc) {
      const ipStart = this.srcMapIpStart;
      const ipEnd = this.ip - 1;
      if (ipStart < 0) {
        throw new Error("No starting map-entry");
      }
      const hasCall = this.containsCall(ipStart, ipEnd);
      if (hasCall) {
        this.srcMap.pushCall(ipStart, ipEnd, srcLoc);
      } else {
        this.srcMap.pushEntry(ipStart, ipEnd, srcLoc);
      }
      this.srcMapIpStart = -1;
    }
    containsCall(ipStart, ipEnd) {
      for (let idx = ipStart; idx <= ipEnd; idx++) {
        const opCode = this.prg.opCodes[idx];
        if (hasCallPotential(opCode)) {
          return true;
        }
      }
      return false;
    }
    define_address(label) {
      this.addresses.set(label, this.ip);
    }
    build() {
      this.resolveAddresses();
      const code = this.prg;
      code.srcMap = this.srcMap;
      return code;
    }
    resolveAddresses() {
      const resolveAddr = (uaddr, argArray) => {
        let label = argArray[uaddr];
        if (label instanceof AddrLabel) {
          let prgAddr = this.addresses.get(label);
          if (prgAddr === void 0) {
            throw new Error(`No address for label ${label} at address ${uaddr}`);
          }
          argArray[uaddr] = prgAddr;
          return 1;
        } else {
          return 0;
        }
      };
      for (let uaddr of this.unresolved) {
        let resolvedCount = 0;
        resolvedCount += resolveAddr(uaddr, this.prg.arg1);
        resolvedCount += resolveAddr(uaddr, this.prg.arg2);
        if (resolvedCount === 0) {
          throw new Error("No addresses resolved for " + uaddr);
        }
      }
    }
  };
  var NotImplemented = class extends Error {
    constructor(message) {
      super(message);
    }
  };
  var CompileTimeError = class extends Error {
    constructor(message) {
      super(message);
    }
  };
  var ExpressionCompilerContext = class _ExpressionCompilerContext {
    constructor(isFuncRef = false, isStatement = false) {
      this.isFuncRef = isFuncRef;
      this.isStatement = isStatement;
    }
    enterFunctionReference() {
      const newContext = new _ExpressionCompilerContext(true, this.isStatement);
      return newContext;
    }
    enterStatement() {
      const newContext = new _ExpressionCompilerContext(this.isFuncRef, true);
      return newContext;
    }
  };
  var ExpressionCompiler = class {
    constructor(builder) {
      this.builder = builder;
    }
    compileExpression(e, context = null) {
      const b = this.builder;
      context = context == null ? new ExpressionCompilerContext() : context;
      if (e instanceof Literal) {
        b.push(BC.PUSH, e.value);
      } else if (e instanceof IdentifierExpr) {
        this.compileIdentifierExpr(e, context);
      } else if (e instanceof SelfExpr) {
        this.compileSelfExpr();
      } else if (e instanceof SuperExpr) {
        this.compileSuperExpr();
      } else if (e instanceof BinaryExpr) {
        this.compileBinaryExpression(e);
      } else if (e instanceof UnaryExpr) {
        this.compileUnaryExpression(e);
      } else if (e instanceof ChainedComparisonExpr) {
        this.compileChainedComparisonExpression(e);
      } else if (e instanceof LogicExpr) {
        this.compileLogicExpression(e);
      } else if (e instanceof GroupingExpr) {
        this.compileExpression(e.expr, context);
      } else if (e instanceof ListExpr) {
        this.compileListExpression(e);
      } else if (e instanceof MapExpr) {
        this.compileMapExpression(e);
      } else if (e instanceof IndexedAccessExpr) {
        this.compileIndexedAccessExpression(e, context);
      } else if (e instanceof DotAccessExpr) {
        this.compileDotAccessExpression(e, context);
      } else if (e instanceof ListSlicingExpr) {
        this.compileListSlicingExpression(e);
      } else if (e instanceof FunctionCallExpr) {
        this.compileFuncCallExpr(e.callTarget, e.args, context);
      } else if (e instanceof FunctionRefExpr) {
        this.compileFuncRefExpression(e, context);
      } else if (e instanceof FunctionBodyExpr) {
        this.compileFunctionBodyExpression(e);
      } else {
        throw new NotImplemented("Expression type not yet supported: " + e.description());
      }
    }
    compileIdentifierExpr(e, context) {
      this.builder.push(BC.EVAL_ID, e.identifier.value, context.isFuncRef);
    }
    compileSelfExpr() {
      this.builder.push(BC.EVAL_ID, "self");
    }
    compileSuperExpr() {
      this.builder.push(BC.EVAL_ID, "super");
    }
    compileFuncCall(callTarget, args) {
      const context = new ExpressionCompilerContext();
      this.compileFuncCallExpr(callTarget, args, context);
    }
    compileFuncCallExpr(callTarget, params, context) {
      const pushParams = () => {
        for (let param of params) {
          this.compileExpression(param);
        }
      };
      const paramCount = params.length;
      if (callTarget instanceof IdentifierExpr) {
        const identifier = callTarget.identifier.value;
        pushParams();
        this.builder.push(BC.CALL, identifier, paramCount);
      } else if (callTarget instanceof DotAccessExpr && callTarget.accessTarget instanceof SuperExpr) {
        const identifier = callTarget.property.value;
        this.builder.push(BC.PUSH, identifier);
        pushParams();
        this.builder.push(BC.SUPER_DOT_CALL, paramCount);
      } else if (callTarget instanceof DotAccessExpr) {
        const identifier = callTarget.property.value;
        this.compileExpression(callTarget.accessTarget);
        this.builder.push(BC.PUSH, identifier);
        pushParams();
        this.builder.push(BC.PROPERTY_CALL, paramCount);
      } else if (callTarget instanceof IndexedAccessExpr && callTarget.accessTarget instanceof SuperExpr) {
        this.compileExpression(callTarget.indexExpr);
        pushParams();
        this.builder.push(BC.SUPER_DOT_CALL, paramCount);
      } else if (callTarget instanceof IndexedAccessExpr) {
        this.compileExpression(callTarget.accessTarget);
        this.compileExpression(callTarget.indexExpr);
        pushParams();
        this.builder.push(BC.PROPERTY_CALL, paramCount);
      } else if (callTarget instanceof FunctionCallExpr) {
        const ctx = context.enterFunctionReference();
        this.compileExpression(callTarget, ctx);
        pushParams();
        this.builder.push(BC.FUNCREF_CALL, paramCount);
      } else {
        throw new CompileTimeError(`Invalid call target: ${callTarget.toJson()}`);
      }
    }
    compileBinaryExpression(e) {
      this.compileExpression(e.left);
      this.compileExpression(e.right);
      switch (e.operator.tokenType) {
        case TokenType.OP_EQUALS: {
          this.builder.push(BC.COMPARE_EQ);
          break;
        }
        case TokenType.OP_NOT_EQUALS: {
          this.builder.push(BC.COMPARE_NE);
          break;
        }
        case TokenType.OP_PLUS: {
          this.builder.push(BC.ADD_VALUES);
          break;
        }
        case TokenType.OP_MINUS: {
          this.builder.push(BC.SUBTRACT_VALUES);
          break;
        }
        case TokenType.OP_MULT: {
          this.builder.push(BC.MULTIPLY_VALUES);
          break;
        }
        case TokenType.OP_DIV: {
          this.builder.push(BC.DIVIDE_VALUES);
          break;
        }
        case TokenType.OP_POW: {
          this.builder.push(BC.POWER_VALUES);
          break;
        }
        case TokenType.OP_MOD: {
          this.builder.push(BC.MOD_VALUES);
          break;
        }
        case TokenType.OP_LESS_EQUALS: {
          this.builder.push(BC.COMPARE_LE);
          break;
        }
        case TokenType.OP_LESS: {
          this.builder.push(BC.COMPARE_LT);
          break;
        }
        case TokenType.OP_GREATER_EQUALS: {
          this.builder.push(BC.COMPARE_GE);
          break;
        }
        case TokenType.OP_GREATER: {
          this.builder.push(BC.COMPARE_GT);
          break;
        }
        case TokenType.OP_ISA: {
          this.builder.push(BC.COMPARE_ISA);
          break;
        }
        default:
          throw new NotImplemented("Operator not implemented: " + TokenType[e.operator.tokenType]);
      }
    }
    compileUnaryExpression(e) {
      this.compileExpression(e.expr);
      switch (e.operator.tokenType) {
        case TokenType.OP_NOT: {
          this.builder.push(BC.NEGATE_BOOLEAN);
          break;
        }
        case TokenType.OP_MINUS: {
          this.builder.push(BC.NEGATE_NUMBER);
          break;
        }
        case TokenType.KW_NEW: {
          this.builder.push(BC.NEW_MAP);
          break;
        }
        default: {
          throw new CompileTimeError("Invalid unary operator. Token type: " + e.operator.tokenType);
        }
      }
    }
    compileChainedComparisonExpression(e) {
      for (let operandExpression of e.operands) {
        this.compileExpression(operandExpression);
      }
      for (let operator of e.operators) {
        switch (operator.tokenType) {
          case TokenType.OP_EQUALS: {
            this.builder.push(BC.PUSH, "==");
            break;
          }
          case TokenType.OP_NOT_EQUALS: {
            this.builder.push(BC.PUSH, "!=");
            break;
          }
          case TokenType.OP_GREATER: {
            this.builder.push(BC.PUSH, ">");
            break;
          }
          case TokenType.OP_GREATER_EQUALS: {
            this.builder.push(BC.PUSH, ">=");
            break;
          }
          case TokenType.OP_LESS: {
            this.builder.push(BC.PUSH, "<");
            break;
          }
          case TokenType.OP_LESS_EQUALS: {
            this.builder.push(BC.PUSH, "<=");
            break;
          }
          default: {
            throw new CompileTimeError("Invalid operator found");
          }
        }
      }
      const pairCount = e.operators.length;
      this.builder.push(BC.CHAINED_COMPARISON, pairCount);
    }
    compileLogicExpression(e) {
      const isAnd = e.operator.tokenType == TokenType.OP_AND;
      const isOr = e.operator.tokenType == TokenType.OP_OR;
      if (!(isAnd || isOr)) {
        throw new CompileTimeError("Invalid logic operator: must be either AND or OR");
      }
      const shortCircuitAddr = this.builder.newLabel();
      this.compileExpression(e.left);
      if (isAnd) {
        this.builder.push_unresolved(BC.JUMP_IF_FALSE, shortCircuitAddr);
      } else {
        this.builder.push_unresolved(BC.JUMP_IF_TRUE, shortCircuitAddr);
      }
      this.compileExpression(e.right);
      if (isAnd) {
        this.builder.push(BC.LOGIC_AND_VALUES);
      } else {
        this.builder.push(BC.LOGIC_OR_VALUES);
      }
      this.builder.define_address(shortCircuitAddr);
    }
    compileListExpression(e) {
      const elementCount = e.elements.length;
      for (let elementExpr of e.elements) {
        this.compileExpression(elementExpr);
      }
      this.builder.push(BC.BUILD_LIST, elementCount);
    }
    compileMapExpression(e) {
      const elementCount = e.elements.size;
      for (let [keyExpr, valueExpr] of e.elements) {
        this.compileExpression(keyExpr);
        this.compileExpression(valueExpr);
      }
      this.builder.push(BC.BUILD_MAP, elementCount);
    }
    compileIndexedAccessExpression(e, context) {
      this.compileExpression(e.accessTarget);
      this.compileExpression(e.indexExpr);
      let isFuncRef;
      if (context.isStatement) {
        isFuncRef = false;
      } else {
        isFuncRef = true;
      }
      this.builder.push(BC.INDEXED_ACCESS, isFuncRef);
    }
    compileDotAccessExpression(e, context) {
      if (e.accessTarget instanceof SuperExpr) {
        this.builder.push(BC.SUPER_DOT_ACCESS, e.property.value, context.isFuncRef);
      } else {
        this.compileExpression(e.accessTarget);
        this.builder.push(BC.DOT_ACCESS, e.property.value, context.isFuncRef);
      }
    }
    compileFuncRefExpression(e, context) {
      const functionReferenceContext = context.enterFunctionReference();
      this.compileExpression(e.refTarget, functionReferenceContext);
    }
    compileListSlicingExpression(e) {
      this.compileExpression(e.listTarget);
      if (e.start) {
        this.compileExpression(e.start);
      } else {
        this.builder.push(BC.PUSH, null);
      }
      if (e.stop) {
        this.compileExpression(e.stop);
      } else {
        this.builder.push(BC.PUSH, null);
      }
      this.builder.push(BC.SLICE_SEQUENCE);
    }
    compileFunctionBodyExpression(e) {
      const args = [];
      for (let arg of e.args) {
        if (arg.defaultValue) {
          args.push(new FuncDefArg(arg.name, arg.defaultValue.value));
        } else {
          args.push(new FuncDefArg(arg.name, void 0));
        }
      }
      const funcCompiler = new Compiler(e.statements);
      const funcCode = funcCompiler.compileFunctionBody();
      let funcDef = new FuncDef(args, funcCode);
      this.builder.push(BC.PUSH, funcDef);
    }
  };
  var CompilerContext = class {
    constructor() {
      __publicField(this, "parent");
      this.parent = void 0;
    }
    insideWhile() {
      if (this.parent) {
        return this.parent.insideWhile();
      } else {
        return false;
      }
    }
    insideForLoop() {
      if (this.parent) {
        return this.parent.insideForLoop();
      } else {
        return false;
      }
    }
    insideFunctionBody() {
      if (this.parent) {
        return this.parent.insideFunctionBody();
      } else {
        return false;
      }
    }
    getForLoopNr() {
      if (this.parent) {
        return this.parent.getForLoopNr();
      } else {
        return 0;
      }
    }
  };
  var WhileContext = class extends CompilerContext {
    constructor(parent, startLabel, endLabel) {
      super();
      __publicField(this, "startLabel");
      __publicField(this, "endLabel");
      this.parent = parent;
      this.startLabel = startLabel;
      this.endLabel = endLabel;
    }
    insideWhile() {
      return true;
    }
  };
  var ForLoopContext$1 = class ForLoopContext extends CompilerContext {
    constructor(parent) {
      super();
      this.parent = parent;
    }
    insideForLoop() {
      return true;
    }
    getForLoopNr() {
      if (this.parent) {
        return 1 + this.parent.getForLoopNr();
      } else {
        throw new Error("Parent not set");
      }
    }
  };
  var FunctionBodyContext = class extends CompilerContext {
    constructor() {
      super();
    }
    insideFunctionBody() {
      return true;
    }
  };
  var StatementCompiler = class {
    constructor(builder, expressionCompiler) {
      this.builder = builder;
      this.expressionCompiler = expressionCompiler;
    }
    compileStatements(statements, context) {
      for (const s of statements) {
        this.compileStatement(s, context);
      }
    }
    compileStatement(s, context) {
      if (s instanceof ExpressionStatement) {
        this.compileExpressionStatement(s);
      } else if (s instanceof AssignmentStatement) {
        this.compileAssignmentStatement(s);
      } else if (s instanceof MathAssignmentStatement) {
        this.compileMathAssignmentStatement(s);
      } else if (s instanceof ReturnStatement) {
        this.compileReturnStatement(s);
      } else if (s instanceof IfStatement) {
        this.compileIfStatement(s, context);
      } else if (s instanceof WhileStatement) {
        this.compileWhileStatement(s, context);
      } else if (s instanceof ForStatement) {
        this.compileForLoopStatement(s, context);
      } else if (s instanceof BreakStatement) {
        this.compileBreakStatement(s, context);
      } else if (s instanceof ContinueStatement) {
        this.compileContinueStatement(s, context);
      } else if (s instanceof FunctionCallStatement) {
        this.compileFunctionCallStatement(s);
      } else {
        throw new Error("Compilation of statement not implemented: " + s.description());
      }
    }
    compileExpression(e) {
      this.expressionCompiler.compileExpression(e);
    }
    compileExpressionStatement(s) {
      let exprCompilerContext = new ExpressionCompilerContext();
      exprCompilerContext = exprCompilerContext.enterStatement();
      this.builder.startMapEntry();
      this.expressionCompiler.compileExpression(s.expression, exprCompilerContext);
      this.builder.endMapEntry(s.location());
      this.builder.push(BC.POP);
    }
    compileAssignmentStatement(s) {
      this.builder.startMapEntry();
      const target = s.target;
      if (target instanceof IdentifierExpr) {
        this.compileExpression(s.value);
        this.builder.push(BC.ASSIGN_LOCAL, target.identifier.value);
      } else if (target instanceof IndexedAccessExpr) {
        this.compileExpression(target.indexExpr);
        this.compileExpression(s.value);
        this.compileExpression(target.accessTarget);
        this.builder.push(BC.ASSIGN_INDEXED);
      } else if (target instanceof DotAccessExpr) {
        this.compileExpression(s.value);
        this.compileExpression(target.accessTarget);
        this.builder.push(BC.DOT_ASSIGN, target.property.value);
      } else {
        throw new Error("Assignment target not yet supported: " + s.target.description());
      }
      this.builder.endMapEntry(s.location());
    }
    compileMathAssignmentStatement(s) {
      this.builder.startMapEntry();
      const target = s.target;
      if (target instanceof IdentifierExpr) {
        this.compileExpression(s.value);
        this.builder.push(BC.MATH_ASSIGN_LOCAL, target.identifier.value, s.opToken);
      } else if (target instanceof IndexedAccessExpr) {
        this.compileExpression(target.accessTarget);
        this.compileExpression(target.indexExpr);
        this.compileExpression(s.value);
        this.builder.push(BC.MATH_ASSIGN_INDEXED, s.opToken);
      } else if (target instanceof DotAccessExpr) {
        this.compileExpression(target.accessTarget);
        this.compileExpression(s.value);
        this.builder.push(BC.MATH_DOT_ASSIGN, target.property.value, s.opToken);
      } else {
        throw new Error("Assignment target not yet supported: " + s.target.description());
      }
      this.builder.endMapEntry(s.location());
    }
    compileReturnStatement(s) {
      this.builder.startMapEntry();
      if (s.optValue) {
        this.compileExpression(s.optValue);
      } else {
        this.builder.push(BC.PUSH, null);
      }
      this.builder.push(BC.RETURN);
      this.builder.endMapEntry(s.location());
    }
    compileIfStatement(s, context) {
      const endIfThenLabel = this.builder.newLabel();
      const endFullIfBlockLabel = this.builder.newLabel();
      this.builder.startMapEntry();
      this.compileExpression(s.ifBranch.condition);
      this.builder.push_unresolved(BC.POP_JUMP_FALSE, endIfThenLabel);
      this.builder.endMapEntry(s.ifBranch.condition.location());
      this.compileStatements(s.ifBranch.statements, context);
      this.builder.push_unresolved(BC.JUMP, endFullIfBlockLabel);
      this.builder.define_address(endIfThenLabel);
      for (let elseIf of s.elseIfs) {
        let elseIfLabel = this.builder.newLabel();
        this.builder.startMapEntry();
        this.compileExpression(elseIf.condition);
        this.builder.push_unresolved(BC.POP_JUMP_FALSE, elseIfLabel);
        this.builder.endMapEntry(elseIf.condition.location());
        this.compileStatements(elseIf.statements, context);
        this.builder.push_unresolved(BC.JUMP, endFullIfBlockLabel);
        this.builder.define_address(elseIfLabel);
      }
      if (s.elseBranch.length > 0) {
        this.compileStatements(s.elseBranch, context);
      }
      this.builder.define_address(endFullIfBlockLabel);
    }
    compileWhileStatement(s, context) {
      const startWhileLabel = this.builder.newLabel();
      const endWhileLabel = this.builder.newLabel();
      this.builder.startMapEntry();
      this.builder.define_address(startWhileLabel);
      this.compileExpression(s.condition);
      this.builder.push_unresolved(BC.POP_JUMP_FALSE, endWhileLabel);
      this.builder.endMapEntry(s.condition.location());
      const whileContext = new WhileContext(context, startWhileLabel, endWhileLabel);
      this.compileStatements(s.statements, whileContext);
      this.builder.push_unresolved(BC.JUMP, startWhileLabel);
      this.builder.define_address(endWhileLabel);
    }
    compileForLoopStatement(s, context) {
      const startForLoopLabel = this.builder.newLabel();
      const endForLoopLabel = this.builder.newLabel();
      const forLoopContext = new ForLoopContext$1(context);
      const forLoopNr = forLoopContext.getForLoopNr();
      this.builder.push(BC.PUSH, s.loopVar.value);
      this.compileExpression(s.rangeExpr);
      this.builder.push_unresolved(BC.PUSH, endForLoopLabel);
      this.builder.push_unresolved(BC.PUSH, startForLoopLabel);
      this.builder.push(BC.CREATE_FOR_LOOP, forLoopNr);
      this.builder.startMapEntry();
      this.builder.define_address(startForLoopLabel);
      this.builder.push(BC.ITERATE_FOR_LOOP, forLoopNr);
      this.builder.endMapEntry(s.headerLocation);
      this.compileStatements(s.statements, forLoopContext);
      this.builder.push_unresolved(BC.JUMP, startForLoopLabel);
      this.builder.define_address(endForLoopLabel);
    }
    compileBreakStatement(s, context) {
      if (context.insideWhile() && context instanceof WhileContext) {
        this.builder.startMapEntry();
        this.builder.push_unresolved(BC.JUMP, context.endLabel);
        this.builder.endMapEntry(s.location());
      } else if (context.insideForLoop() && context instanceof ForLoopContext$1) {
        this.builder.startMapEntry();
        this.builder.push(BC.BREAK_FOR_LOOP, context.getForLoopNr());
        this.builder.endMapEntry(s.location());
      } else {
        throw new Error("break outside while / for loop");
      }
    }
    compileContinueStatement(s, context) {
      if (context.insideWhile() && context instanceof WhileContext) {
        this.builder.startMapEntry();
        this.builder.push_unresolved(BC.JUMP, context.startLabel);
        this.builder.endMapEntry(s.location());
      } else if (context.insideForLoop() && context instanceof ForLoopContext$1) {
        this.builder.startMapEntry();
        this.builder.push(BC.CONTINUE_FOR_LOOP, context.getForLoopNr());
        this.builder.endMapEntry(s.location());
      } else {
        throw new Error("continue outside while / for loop");
      }
    }
    compileFunctionCallStatement(s) {
      this.builder.startMapEntry();
      this.expressionCompiler.compileFuncCall(s.callTarget, s.args);
      this.builder.endMapEntry(s.location());
      this.builder.push(BC.POP);
    }
  };
  var Compiler = class {
    constructor(statements, srcFile) {
      __publicField(this, "builder");
      __publicField(this, "statementCompiler");
      __publicField(this, "expressionCompiler");
      this.statements = statements;
      this.builder = new CodeBuilder(srcFile);
      this.expressionCompiler = new ExpressionCompiler(this.builder);
      this.statementCompiler = new StatementCompiler(this.builder, this.expressionCompiler);
    }
    compile() {
      const context = new CompilerContext();
      this.statementCompiler.compileStatements(this.statements, context);
      const prg = this.builder.build();
      return prg;
    }
    compileModuleInvocation(moduleName) {
      const context = new FunctionBodyContext();
      this.statementCompiler.compileStatements(this.statements, context);
      this.emitLastReturn(true);
      const moduleStatements = this.builder.build();
      const moduleLoaderBuilder = new CodeBuilder(`${moduleName} (loader)`);
      const moduleBodyFn = new FuncDef([], moduleStatements);
      moduleLoaderBuilder.push(BC.PUSH, moduleBodyFn);
      moduleLoaderBuilder.push(BC.FUNCREF_CALL, 0);
      moduleLoaderBuilder.push(BC.ASSIGN_LOCAL, moduleName);
      const runnerCode = moduleLoaderBuilder.build();
      return runnerCode;
    }
    compileFunctionBody() {
      const context = new FunctionBodyContext();
      this.statementCompiler.compileStatements(this.statements, context);
      this.emitLastReturn(false);
      const prg = this.builder.build();
      return prg;
    }
    emitLastReturn(inModuleBody) {
      let emitReturn = true;
      if (this.statements.length > 0) {
        const lastStatement = this.statements[this.statements.length - 1];
        if (lastStatement instanceof ReturnStatement) {
          emitReturn = false;
        }
      }
      if (emitReturn) {
        if (inModuleBody) {
          this.builder.push(BC.EVAL_ID, "locals");
          this.builder.push(BC.RETURN);
        } else {
          this.builder.push(BC.PUSH, void 0);
          this.builder.push(BC.RETURN);
        }
      }
    }
  };
  var Stepper = class {
    constructor(id, d, vm) {
      __publicField(this, "initialCallStackDepth");
      __publicField(this, "initialEntry");
      this.id = id;
      this.d = d;
      this.vm = vm;
      this.initialCallStackDepth = this.vm.savedFrames.count();
      this.initialEntry = this.d.getCurrentSrcMapEntry();
    }
    scheduleNext() {
      setTimeout(() => {
        this.step();
      }, 0);
    }
    resumeFromSuspension() {
      this.scheduleNext();
    }
    finish() {
      this.d.stepUntilSrcMapEntryFound();
      this.d.notifyChanges();
      this.d.removeStepper(this.id);
    }
  };
  var StepOverStepper = class extends Stepper {
    constructor(id, d, vm) {
      super(id, d, vm);
      __publicField(this, "initialCallStackDepth");
      __publicField(this, "initialEntry");
      this.initialCallStackDepth = vm.savedFrames.count();
      this.initialEntry = d.getCurrentSrcMapEntry();
    }
    step() {
      if (this.vm.isSuspended()) {
        return;
      }
      this.vm.runOneCycle();
      const currentCallStackDepth = this.vm.savedFrames.count();
      if (currentCallStackDepth > this.initialCallStackDepth) {
        this.scheduleNext();
        return;
      }
      if (this.vm.isFinished()) {
        this.finish();
        return;
      }
      const currentEntry = this.d.getCurrentSrcMapEntry();
      let sourceLocationChanged = false;
      if (this.initialEntry === null && currentEntry !== null) {
        sourceLocationChanged = true;
      } else if (this.initialEntry !== null && currentEntry === null) {
        this.scheduleNext();
        return;
      } else if (this.initialEntry !== null && currentEntry !== null) {
        const initialLoc = this.initialEntry.srcLoc.start.row;
        const currentLoc = currentEntry.srcLoc.start.row;
        sourceLocationChanged = initialLoc !== currentLoc;
      }
      if (sourceLocationChanged) {
        this.finish();
        return;
      }
      this.scheduleNext();
    }
  };
  var StepIntoStepper = class extends Stepper {
    constructor(id, d, vm) {
      super(id, d, vm);
      __publicField(this, "initialCount");
      this.initialCount = this.vm.savedFrames.count();
    }
    step() {
      if (this.vm.isSuspended()) {
        return;
      }
      const nextOpIsCall = this.vm.couldResultInCall();
      this.vm.runOneCycle();
      const currentCount = this.vm.savedFrames.count();
      if (currentCount > this.initialCount) {
        this.finish();
        return;
      } else if (nextOpIsCall && currentCount == this.initialCount) {
        if (!this.vm.isSuspended()) {
          this.finish();
        }
        return;
      }
      if (this.vm.isFinished()) {
        this.finish();
        return;
      }
      this.scheduleNext();
    }
  };
  var StepOutStepper = class extends Stepper {
    constructor(id, d, vm) {
      super(id, d, vm);
      __publicField(this, "initialCount");
      this.initialCount = this.vm.savedFrames.count();
    }
    step() {
      if (this.vm.isSuspended()) {
        return;
      }
      this.vm.runOneCycle();
      const currentCount = this.vm.savedFrames.count();
      if (currentCount < this.initialCount) {
        this.finish();
        return;
      }
      if (this.vm.isFinished()) {
        this.finish();
        return;
      }
      this.scheduleNext();
    }
  };
  var Debugger = class {
    constructor(vm) {
      __publicField(this, "nextStepperId", 1);
      __publicField(this, "steppers");
      __publicField(this, "onSrcChange", () => {
      });
      __publicField(this, "onFinished", () => {
      });
      this.vm = vm;
      this.vm.setRunAfterSuspended(false);
      this.steppers = /* @__PURE__ */ new Map();
      vm.onResumingExecution = () => {
        const steppers = this.steppers.values();
        for (let s of steppers) {
          s.resumeFromSuspension();
        }
      };
    }
    get compiledCode() {
      return this.vm.code;
    }
    // Move to first instruction
    start() {
      this.notifyChanges();
    }
    stop() {
      this.vm.stopRunning();
    }
    getCurrentSourceLocation() {
      const fileName = this.vm.getCurrentSrcFileName();
      const lineNr = this.vm.getCurrentSrcLineNr();
      return [fileName, lineNr];
    }
    getCurrentSrcMapEntry() {
      return this._srcMap().findEntry(this.vm.ip);
    }
    // True if the current location can be stepped into 
    // (because it contains at least one call)
    canStepIn() {
      const entry = this.getCurrentSrcMapEntry();
      if (entry !== null) {
        return entry.isCall;
      } else {
        return false;
      }
    }
    canStepOut() {
      return this.vm.savedFrames.count() > 0;
    }
    newStepOverStepper() {
      const stepper = new StepOverStepper(this.nextStepperId, this, this.vm);
      this.steppers.set(this.nextStepperId, stepper);
      this.nextStepperId++;
      return stepper;
    }
    newStepIntoStepper() {
      const stepper = new StepIntoStepper(this.nextStepperId, this, this.vm);
      this.steppers.set(this.nextStepperId, stepper);
      this.nextStepperId++;
      return stepper;
    }
    newStepOutStepper() {
      const stepper = new StepOutStepper(this.nextStepperId, this, this.vm);
      this.steppers.set(this.nextStepperId, stepper);
      this.nextStepperId++;
      return stepper;
    }
    removeStepper(id) {
      this.steppers.delete(id);
    }
    stepOver() {
      const stepper = this.newStepOverStepper();
      stepper.scheduleNext();
    }
    stepInto() {
      const stepper = this.newStepIntoStepper();
      stepper.scheduleNext();
    }
    stepOut() {
      const stepper = this.newStepOutStepper();
      stepper.scheduleNext();
    }
    stepUntilSrcMapEntryFound() {
      let currentEntry = this.getCurrentSrcMapEntry();
      while (currentEntry === null && this.vm.isRunning()) {
        this.vm.runOneCycle();
        currentEntry = this.getCurrentSrcMapEntry();
      }
    }
    notifyChanges() {
      this.highlightSource();
      this.notifyFinished();
    }
    highlightSource() {
      const sme = this.getCurrentSrcMapEntry();
      if (sme !== null) {
        this.onSrcChange();
      }
    }
    notifyFinished() {
      if (this.vm.isFinished()) {
        this.onFinished();
      }
    }
    _srcMap() {
      return this.vm.code.srcMap;
    }
    _srcMapEntry() {
      return this._srcMap().findEntry(this.vm.ip);
    }
  };
  var HashMap = class _HashMap {
    constructor() {
      __publicField(this, "_size", 0);
      __publicField(this, "buckets");
      this.buckets = /* @__PURE__ */ new Map();
    }
    size() {
      return this._size;
    }
    set(key, value) {
      if (value === void 0) {
        this.delete(key);
        return;
      }
      const _hashCode = hashCode(key);
      let bucket = this.buckets.get(_hashCode);
      if (!bucket) {
        bucket = new Array();
        this.buckets.set(_hashCode, bucket);
      }
      let entryFound = false;
      for (let i = 0; i < bucket.length; i++) {
        if (equals(bucket[i].key, key)) {
          bucket[i].value = value;
          entryFound = true;
          break;
        }
      }
      if (!entryFound) {
        bucket.push({ key, value });
        this._size += 1;
      }
    }
    get(key) {
      const _hashCode = hashCode(key);
      const bucket = this.buckets.get(_hashCode);
      if (!bucket) {
        return void 0;
      }
      for (let i = 0; i < bucket.length; ++i) {
        if (equals(bucket[i].key, key)) {
          return bucket[i].value;
        }
      }
      return void 0;
    }
    has(key) {
      const _hashCode = hashCode(key);
      const bucket = this.buckets.get(_hashCode);
      if (!bucket) {
        return false;
      }
      for (let i = 0; i < bucket.length; ++i) {
        if (equals(bucket[i].key, key)) {
          return true;
        }
      }
      return false;
    }
    delete(key) {
      const _hashCode = hashCode(key);
      const bucket = this.buckets.get(_hashCode);
      if (!bucket) {
        return;
      }
      let bucketIdx = -1;
      for (let i = 0; i < bucket.length; ++i) {
        if (equals(bucket[i].key, key)) {
          bucketIdx = i;
          break;
        }
      }
      if (bucketIdx >= 0) {
        bucket.splice(bucketIdx, 1);
        this._size -= 1;
      }
      if (bucket.length == 0) {
        this.buckets.delete(_hashCode);
      }
    }
    keys() {
      const keys = new Array();
      for (let bucket of this.buckets.values()) {
        for (let i = 0; i < bucket.length; ++i) {
          keys.push(bucket[i].key);
        }
      }
      return keys;
    }
    values() {
      const values = new Array();
      for (let bucket of this.buckets.values()) {
        for (let i = 0; i < bucket.length; ++i) {
          values.push(bucket[i].value);
        }
      }
      return values;
    }
    // TODO: implement returning an iterator to avoid
    // unnecessary traversing
    entries() {
      const entries = new Array();
      for (let bucket of this.buckets.values()) {
        for (let i = 0; i < bucket.length; ++i) {
          entries.push(bucket[i]);
        }
      }
      return entries;
    }
    toMap(depth = 16) {
      if (depth < 0) {
        return /* @__PURE__ */ new Map();
      }
      const result = /* @__PURE__ */ new Map();
      for (let bucket of this.buckets.values()) {
        for (let i = 0; i < bucket.length; ++i) {
          const entry = bucket[i];
          let key = entry.key;
          let value = entry.value;
          if (key instanceof _HashMap) {
            key = key.toMap(depth - 1);
          }
          if (value instanceof _HashMap) {
            value = value.toMap(depth - 1);
          }
          result.set(key, value);
        }
      }
      return result;
    }
  };
  function newRandomGenerator(seed = void 0) {
    if (seed === void 0) {
      seed = +/* @__PURE__ */ new Date() + Math.random();
    }
    function Mash() {
      let n = 4022871197;
      return function(r) {
        for (let t, s, u = 0, e = 0.02519603282416938; u < r.length; u++) {
          s = r.charCodeAt(u);
          let f = e * (n += s) - (n * e | 0);
          n = 4294967296 * ((t = f * (e * n | 0)) - (t | 0)) + (t | 0);
        }
        return (n | 0) * 23283064365386963e-26;
      };
    }
    return function() {
      let m = Mash();
      let a = m(" ");
      let b = m(" ");
      let c = m(" ");
      let x = 1;
      const seedStr = seed.toString();
      a -= m(seedStr);
      b -= m(seedStr);
      c -= m(seedStr);
      a < 0 && a++;
      b < 0 && b++;
      c < 0 && c++;
      return function() {
        var y = x * 23283064365386963e-26 + a * 2091639;
        a = b, b = c;
        return c = y - (x = y | 0);
      };
    }();
  }
  var Stack = class {
    constructor() {
      __publicField(this, "lastValueUndefined");
      __publicField(this, "elements");
      this.elements = [];
      this.lastValueUndefined = false;
    }
    clear() {
      this.elements = [];
    }
    push(element) {
      if (element === void 0) {
        this.elements.push(null);
        this.lastValueUndefined = true;
      } else {
        this.elements.push(element);
        this.lastValueUndefined = false;
      }
    }
    pop() {
      let result = this.elements.pop();
      if (result === void 0) {
        throw new Error("Stack is empty");
      } else {
        return result;
      }
    }
    // Pop N values. Return them in original order (as they were pushed).
    popN(count) {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.unshift(this.pop());
      }
      return result;
    }
    // Return top-most value without removing it
    peek() {
      if (this.elements.length == 0) {
        throw new Error("Stack is empty");
      } else {
        return this.elements[this.elements.length - 1];
      }
    }
    count() {
      return this.elements.length;
    }
  };
  var Context = class {
    constructor(vm, parent = null) {
      __publicField(this, "locals");
      __publicField(this, "parent");
      __publicField(this, "vm");
      this.locals = new MSMap(vm);
      this.parent = parent;
      this.vm = vm;
    }
    setLocal(identifier, value) {
      if (identifier === "globals") {
        throw new RuntimeError(`Can't assign to globals`);
      } else if (identifier === "locals") {
        throw new RuntimeError(`Can't assign to locals`);
      }
      this.locals.set(identifier, value);
    }
    getOpt(identifier) {
      if (this.locals.has(identifier)) {
        const localValue = this.locals.get(identifier);
        return localValue;
      } else if (identifier === "globals") {
        return this.vm.globalContext.locals;
      } else if (identifier === "locals") {
        return this.locals;
      } else if (identifier === "outer") {
        return this.getOuterLocals();
      } else if (this.parent) {
        return this.parent.getOpt(identifier);
      } else {
        return this.vm.resolveIntrinsic(identifier);
      }
    }
    // Normally the parent context inside a function.
    // At the global scope outer == globals.
    getOuterLocals() {
      let outerContext;
      if (this.parent) {
        outerContext = this.parent;
      } else {
        outerContext = this.vm.globalContext;
      }
      return outerContext.locals;
    }
  };
  var ForLoop = class {
    constructor(mapFactory, startAddr, endAddr, localVarName, values) {
      __publicField(this, "startAddr");
      __publicField(this, "endAddr");
      __publicField(this, "localVarName");
      __publicField(this, "values");
      __publicField(this, "mapObj");
      __publicField(this, "valueIdx");
      __publicField(this, "valueCount");
      this.mapFactory = mapFactory;
      this.startAddr = startAddr;
      this.endAddr = endAddr;
      this.localVarName = localVarName;
      this.valueIdx = 0;
      if (values instanceof Array) {
        this.values = values;
        this.mapObj = null;
      } else if (values instanceof MSMap) {
        this.values = Array.from(values.keys());
        this.mapObj = values;
      } else if (typeof values === "string") {
        this.values = Array.from(values);
        this.mapObj = null;
      } else {
        this.values = [];
        this.mapObj = null;
      }
      this.valueCount = this.values.length;
    }
    isOver() {
      return this.valueIdx >= this.valueCount;
    }
    // Gets current value and increases counter
    iterate() {
      let currentValue;
      if (this.mapObj) {
        const currentKey = this.values[this.valueIdx];
        const currentMapValue = this.mapObj.getOpt(currentKey);
        currentValue = this.mapFactory.newMap();
        currentValue.set("key", currentKey);
        currentValue.set("value", currentMapValue);
      } else {
        currentValue = this.values[this.valueIdx];
      }
      this.valueIdx++;
      return currentValue;
    }
  };
  var ForLoopContext2 = class {
    constructor() {
      __publicField(this, "forLoops");
      this.forLoops = {};
    }
    registerForLoop(forLoopNr, forLoop) {
      this.forLoops[forLoopNr] = forLoop;
    }
    getForLoop(forLoopNr) {
      return this.forLoops[forLoopNr];
    }
    deleteForLoop(forLoopNr) {
      delete this.forLoops[forLoopNr];
    }
  };
  var Frame = class {
    constructor(code, ip, frameContext, forLoopContext) {
      __publicField(this, "ip");
      __publicField(this, "code");
      __publicField(this, "context");
      __publicField(this, "forLoopContext");
      this.code = code;
      this.ip = ip;
      this.context = frameContext;
      this.forLoopContext = forLoopContext;
    }
  };
  var ProcessorState = class {
    constructor(vm) {
      __publicField(this, "ip");
      __publicField(this, "opStack");
      __publicField(this, "code");
      __publicField(this, "forLoopContext");
      __publicField(this, "savedFrames");
      __publicField(this, "cycleCount");
      __publicField(this, "onResumingExecution");
      __publicField(this, "onFinished");
      __publicField(this, "suspended");
      this.code = vm.code;
      this.ip = vm.ip;
      this.suspended = vm.suspended;
      this.forLoopContext = vm.forLoopContext;
      this.savedFrames = vm.savedFrames;
      this.opStack = vm.opStack;
      this.cycleCount = vm.cycleCount;
      this.onResumingExecution = vm.onResumingExecution;
      this.onFinished = vm.onFinished;
    }
    static resetState(vm) {
      vm.ip = 0;
      vm.suspended = false;
      vm.forLoopContext = new ForLoopContext2();
      vm.savedFrames = new Stack();
      vm.opStack = new Stack();
      vm.cycleCount = 0;
      vm.onResumingExecution = () => {
      };
      vm.onFinished = () => {
      };
    }
    restoreState(vm) {
      vm.code = this.code;
      vm.ip = this.ip;
      vm.suspended = this.suspended;
      vm.forLoopContext = this.forLoopContext;
      vm.savedFrames = this.savedFrames;
      vm.opStack = this.opStack;
      vm.cycleCount = this.cycleCount;
      vm.onResumingExecution = this.onResumingExecution;
      vm.onFinished = this.onFinished;
    }
  };
  function parseSignature(functionSignature) {
    let fnName = functionSignature;
    let argNames = [];
    let defaultValues = [];
    if (functionSignature.indexOf("(") > 0) {
      const nameArgsParts = functionSignature.split("(");
      fnName = nameArgsParts[0].trim();
      const argsParts = nameArgsParts[1].slice(0, -1).split(",");
      for (let part of argsParts) {
        const argValueParts = part.split("=");
        const argName = argValueParts[0].trim();
        let defaultValue = void 0;
        if (argValueParts.length > 1) {
          const defaultValueStr = argValueParts[1].trim();
          if (defaultValueStr === "null") {
            defaultValue = null;
          } else if (defaultValueStr.startsWith('"')) {
            defaultValue = defaultValueStr.slice(1, -1);
          } else if (defaultValueStr.includes(".")) {
            defaultValue = parseFloat(defaultValueStr);
          } else {
            defaultValue = parseInt(defaultValueStr);
          }
        }
        argNames.push(argName);
        defaultValues.push(defaultValue);
      }
    }
    return [fnName, argNames, defaultValues];
  }
  var MAX_ISA_RECURSION_DEPTH = 16;
  var _Processor = class _Processor2 {
    constructor(stdoutCallback, stderrCallback) {
      __publicField(this, "ip");
      __publicField(this, "opStack");
      __publicField(this, "code");
      __publicField(this, "context");
      __publicField(this, "forLoopContext");
      __publicField(this, "globalContext");
      __publicField(this, "intrinsicsMap");
      __publicField(this, "listCoreType");
      __publicField(this, "mapCoreType");
      __publicField(this, "stringCoreType");
      __publicField(this, "numberCoreType");
      __publicField(this, "funcRefCoreType");
      __publicField(this, "savedFrames");
      __publicField(this, "cycleCount");
      __publicField(this, "maxCount", 73681);
      __publicField(this, "onResumingExecution");
      __publicField(this, "onFinished");
      __publicField(this, "rndGenerator");
      __publicField(this, "executionStartTime");
      __publicField(this, "suspended", false);
      __publicField(this, "halted", false);
      __publicField(this, "maxCallStackDepth", 2e3);
      __publicField(this, "runAfterSuspended");
      __publicField(this, "lastValue");
      this.stdoutCallback = stdoutCallback;
      this.stderrCallback = stderrCallback;
      this.runAfterSuspended = true;
      this.code = new Code();
      this.ip = 0;
      this.globalContext = new Context(this);
      this.intrinsicsMap = /* @__PURE__ */ new Map();
      this.listCoreType = new MSMap(this);
      this.mapCoreType = new MSMap(this);
      this.stringCoreType = new MSMap(this);
      this.numberCoreType = new MSMap(this);
      this.funcRefCoreType = new MSMap(this);
      this.context = this.globalContext;
      this.forLoopContext = new ForLoopContext2();
      this.savedFrames = new Stack();
      this.opStack = new Stack();
      this.cycleCount = 0;
      this.onResumingExecution = () => {
      };
      this.onFinished = () => {
      };
      this.rndGenerator = newRandomGenerator();
      this.executionStartTime = 0;
      this.lastValue = void 0;
    }
    prepareForRunning(code, context = null, globalContext = null) {
      this.code = code;
      this.ip = 0;
      this.cycleCount = 0;
      if (globalContext !== null) {
        this.globalContext = globalContext;
      }
      if (context === null) {
        this.context = this.globalContext;
      } else {
        this.context = context;
      }
      this.savedFrames = new Stack();
      this.opStack = new Stack();
      this.suspended = false;
      this.halted = false;
      this.lastValue = void 0;
    }
    setRunAfterSuspended(flag) {
      this.runAfterSuspended = flag;
    }
    getLastValue() {
      return this.lastValue;
    }
    run() {
      this.executionStartTime = performance.now();
      this.runUntilDone();
    }
    addIntrinsic(signature, impl) {
      const [fnName, argNames, defaultValues] = parseSignature(signature);
      const intrinsicFn = this.makeIntrinsicFn(impl, argNames, defaultValues);
      this.intrinsicsMap.set(fnName, intrinsicFn);
    }
    addMapIntrinsic(target, signature, impl) {
      const [fnName, argNames, defaultValues] = parseSignature(signature);
      const intrinsicFn = this.makeIntrinsicFn(impl, argNames, defaultValues);
      target.set(fnName, intrinsicFn);
    }
    attachExistingIntrinsic(target, name, boundFunc) {
      target.set(name, boundFunc);
    }
    makeIntrinsicFn(impl, argNames = [], defaultValues = []) {
      const args = [];
      const argCount = impl.length;
      if (argNames.length !== argCount || argNames.length !== defaultValues.length) {
        throw new Error("Length mismatch in argument count! Check function signature.");
      }
      for (let argIdx = 0; argIdx < argCount; argIdx++) {
        const argName = argNames[argIdx];
        const defaultValue = defaultValues[argIdx];
        const arg = new FuncDefArg(argName, defaultValue);
        args.push(arg);
      }
      const funcDef = new FuncDef(args, impl);
      const boundFunc = new BoundFunction(funcDef, this.globalContext);
      return boundFunc;
    }
    newMap() {
      return new MSMap(this);
    }
    initRandomGenerator(seed) {
      this.rndGenerator = newRandomGenerator(seed);
    }
    random() {
      return this.rndGenerator();
    }
    runUntilDone() {
      this.runSomeCycles();
      if (this.isRunning()) {
        setTimeout(() => {
          this.runUntilDone();
        }, 0);
      }
    }
    runSomeCycles() {
      if (this.isRunning()) {
        try {
          this.executeCycles();
        } catch (e) {
          this.reportError(e);
          this.stopRunning();
          return;
        }
      }
      if (this.isFinished()) {
        this.cleanupAfterRunning();
      }
    }
    runOneCycle() {
      this.executeCycles(1);
    }
    reportError(e) {
      if (e instanceof RuntimeError) {
        e.setSourceLocation(this.getCurrentSrcFileName(), this.getCurrentSrcLineNr());
        const fileName = this.getCurrentSrcFileName();
        e.setSourceLocation(fileName, this.getCurrentSrcLineNr());
      }
      if (e["message"]) {
        this.stderrCallback(e.message);
      }
      console.error(e);
    }
    executeCycles(maxCount = null) {
      maxCount = maxCount !== null ? maxCount : this.maxCount;
      this.cycleCount = 0;
      while (this.cycleCount < maxCount) {
        if (this.ip >= this.code.opCodes.length) {
          break;
        }
        switch (this.code.opCodes[this.ip]) {
          case BC.CALL: {
            const funcName = this.code.arg1[this.ip];
            const paramCount = this.code.arg2[this.ip];
            const params = this.opStack.popN(paramCount);
            const optValue = this.context.getOpt(funcName);
            if (optValue === void 0) {
              throw new RuntimeError(`Could not resolve "${funcName}"`);
            }
            const resolvedFunc = optValue;
            this.performCall(resolvedFunc, params);
            break;
          }
          case BC.FUNCREF_CALL: {
            const paramCount = this.code.arg1[this.ip];
            const params = this.opStack.popN(paramCount);
            const maybeFuncRef = this.opStack.pop();
            this.performCall(maybeFuncRef, params);
            break;
          }
          case BC.PROPERTY_CALL: {
            const paramCount = this.code.arg1[this.ip];
            const params = this.opStack.popN(paramCount);
            const methodName = this.opStack.pop();
            const callTarget = this.opStack.pop();
            let srcMap = null;
            let resolvedMethod;
            if (callTarget instanceof MSMap) {
              [resolvedMethod, srcMap] = callTarget.getWithSource(methodName);
            } else {
              const baseTypeMap = this.selectCoreTypeMap(callTarget);
              resolvedMethod = baseTypeMap.get(methodName);
            }
            this.performCall(resolvedMethod, params, callTarget, srcMap);
            break;
          }
          case BC.RETURN: {
            if (this.savedFrames.count() > 0) {
              this.popFrame();
            } else {
              this.opStack.pop();
              this.ip += 1;
            }
            break;
          }
          case BC.ASSIGN_LOCAL: {
            const varName = this.code.arg1[this.ip];
            const valueToAssign = this.opStack.pop();
            this.context.setLocal(varName, valueToAssign);
            this.ip += 1;
            break;
          }
          case BC.ASSIGN_INDEXED: {
            const assignTarget = this.opStack.pop();
            const valueToAssign = this.opStack.pop();
            let index = this.opStack.pop();
            const isString = typeof assignTarget === "string";
            const isList = assignTarget instanceof Array;
            const isMap = assignTarget instanceof MSMap;
            if (isList) {
              const effectiveIndex = computeAccessIndex(assignTarget, index);
              assignTarget[effectiveIndex] = valueToAssign;
            } else if (isMap) {
              assignTarget.set(index, valueToAssign);
            } else if (isString) {
              throw new RuntimeError("Cannot assign to String (immutable)");
            } else {
              throw new RuntimeError("Cannot set to element of this type");
            }
            this.ip += 1;
            break;
          }
          case BC.DOT_ASSIGN: {
            const propertyName = this.code.arg1[this.ip];
            const assignTarget = this.opStack.pop();
            const valueToAssign = this.opStack.pop();
            if (!(assignTarget instanceof MSMap)) {
              throw new RuntimeError(`Assignment target must be a Map`);
            }
            assignTarget.set(propertyName, valueToAssign);
            this.ip += 1;
            break;
          }
          case BC.MATH_ASSIGN_LOCAL: {
            const varName = this.code.arg1[this.ip];
            const opTokenType = this.code.arg2[this.ip];
            const operand = this.opStack.pop();
            const existingValue = this.context.getOpt(varName);
            if (existingValue !== void 0) {
              const finalValue = computeMathAssignValue(this, existingValue, opTokenType, operand);
              this.context.setLocal(varName, finalValue);
            } else {
              throw new RuntimeError(`Undefined Local Identifier: '${varName}' is unknown in this context`);
            }
            this.ip += 1;
            break;
          }
          case BC.MATH_ASSIGN_INDEXED: {
            const opTokenType = this.code.arg1[this.ip];
            const operand = this.opStack.pop();
            let index = this.opStack.pop();
            const assignTarget = this.opStack.pop();
            const isString = typeof assignTarget === "string";
            const isList = assignTarget instanceof Array;
            const isMap = assignTarget instanceof MSMap;
            if (isList) {
              const effectiveIndex = computeAccessIndex(assignTarget, index);
              const currentValue = assignTarget[effectiveIndex];
              const finalValue = computeMathAssignValue(this, currentValue, opTokenType, operand);
              assignTarget[effectiveIndex] = finalValue;
            } else if (isMap) {
              const currentValue = assignTarget.get(index);
              const finalValue = computeMathAssignValue(this, currentValue, opTokenType, operand);
              assignTarget.set(index, finalValue);
            } else if (isString) {
              throw new RuntimeError("Cannot assign to String (immutable)");
            } else {
              throw new RuntimeError("Cannot set to element of this type");
            }
            this.ip += 1;
            break;
          }
          case BC.MATH_DOT_ASSIGN: {
            const propertyName = this.code.arg1[this.ip];
            const opTokenType = this.code.arg2[this.ip];
            const operand = this.opStack.pop();
            const assignTarget = this.opStack.pop();
            if (!(assignTarget instanceof MSMap)) {
              throw new RuntimeError(`Assignment target must be a Map`);
            }
            const currentValue = assignTarget.get(propertyName);
            const finalValue = computeMathAssignValue(this, currentValue, opTokenType, operand);
            assignTarget.set(propertyName, finalValue);
            this.ip += 1;
            break;
          }
          case BC.EVAL_ID: {
            const identifier = this.code.arg1[this.ip];
            const isFuncRef = this.code.arg2[this.ip];
            const optValue = this.context.getOpt(identifier);
            if (optValue !== void 0) {
              this.callOrPushValue(optValue, isFuncRef);
            } else {
              throw new RuntimeError(`Undefined Identifier: '${identifier}' is unknown in this context`);
            }
            break;
          }
          case BC.INDEXED_ACCESS: {
            const isFuncRef = this.code.arg1[this.ip];
            let index = this.opStack.pop();
            const accessTarget = this.opStack.pop();
            const isString = typeof accessTarget === "string";
            const isList = accessTarget instanceof Array;
            const isMap = accessTarget instanceof MSMap;
            let value;
            let srcMap = null;
            if (isList || isString) {
              if (typeof index === "number") {
                const effectiveIndex = computeAccessIndex(accessTarget, index);
                value = accessTarget[effectiveIndex];
              } else if (isList) {
                [value, srcMap] = this.listCoreType.getWithSource(index);
              } else if (isString) {
                [value, srcMap] = this.stringCoreType.getWithSource(index);
              } else {
                throw new Error("Uncovered case");
              }
            } else if (isMap) {
              [value, srcMap] = accessTarget.getWithSource(index);
            } else if (typeof index === "number") {
              throw new RuntimeError(`Null Reference Exception: can't index into null`);
            } else {
              throw new RuntimeError(`Type Error (while attempting to look up ${index})`);
            }
            this.callOrPushValue(value, isFuncRef, accessTarget, srcMap);
            break;
          }
          case BC.DOT_ACCESS: {
            const propertyName = this.code.arg1[this.ip];
            const isFuncRef = this.code.arg2[this.ip];
            const accessTarget = this.opStack.pop();
            let value;
            let srcMap;
            if (accessTarget instanceof MSMap) {
              [value, srcMap] = accessTarget.getWithSource(propertyName);
            } else if (accessTarget === null) {
              throw new RuntimeError(`Type Error (while attempting to look up ${propertyName})`);
            } else {
              srcMap = this.selectCoreTypeMap(accessTarget);
              value = srcMap.get(propertyName);
            }
            this.callOrPushValue(value, isFuncRef, accessTarget, srcMap);
            break;
          }
          case BC.SUPER_DOT_ACCESS: {
            const propertyName = this.code.arg1[this.ip];
            const isFuncRef = this.code.arg2[this.ip];
            const superMap = this.context.getOpt("super");
            const selfMap = this.context.getOpt("self");
            if (superMap === void 0) {
              throw new RuntimeError(`Undefined Identifier: 'super' is unknown in this context`);
            }
            if (selfMap === void 0) {
              throw new RuntimeError(`Undefined Identifier: 'self' is unknown in this context`);
            }
            let value;
            let srcMap = null;
            if (superMap instanceof MSMap) {
              [value, srcMap] = superMap.getWithSource(propertyName);
              if (value === void 0) {
                throw new RuntimeError(`Type Error (while attempting to look up ${propertyName})`);
              }
            } else if (superMap === null) {
              throw new RuntimeError(`Type Error (while attempting to look up ${propertyName})`);
            }
            this.callOrPushValue(value, isFuncRef, selfMap, srcMap);
            break;
          }
          case BC.SUPER_DOT_CALL: {
            const paramCount = this.code.arg1[this.ip];
            const superMap = this.context.getOpt("super");
            const selfMap = this.context.getOpt("self");
            if (superMap === void 0) {
              throw new RuntimeError(`Undefined Identifier: 'super' is unknown in this context`);
            }
            if (selfMap === void 0) {
              throw new RuntimeError(`Undefined Identifier: 'self' is unknown in this context`);
            }
            const params = this.opStack.popN(paramCount);
            const methodName = this.opStack.pop();
            let resolvedMethod;
            let srcMap = null;
            if (superMap instanceof MSMap) {
              [resolvedMethod, srcMap] = superMap.getWithSource(methodName);
              if (resolvedMethod === void 0) {
                throw new RuntimeError(`Type Error (while attempting to look up ${methodName})`);
              }
            } else if (superMap === null) {
              throw new RuntimeError(`Type Error (while attempting to look up ${methodName})`);
            }
            this.performCall(resolvedMethod, params, selfMap, srcMap);
            break;
          }
          case BC.SLICE_SEQUENCE: {
            const endIdx = this.opStack.pop();
            const startIdx = this.opStack.pop();
            const sliceTarget = this.opStack.pop();
            const newCollection = slice(this, sliceTarget, startIdx, endIdx);
            this.opStack.push(newCollection);
            this.ip += 1;
            break;
          }
          case BC.CHAINED_COMPARISON: {
            const pairCount = this.code.arg1[this.ip];
            const operators = this.opStack.popN(pairCount);
            const values = this.opStack.popN(pairCount + 1);
            const result = chainedComparison(values, operators);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.PUSH: {
            const value = this.code.arg1[this.ip];
            if (value instanceof FuncDef) {
              const boundFunction = new BoundFunction(value, this.context);
              this.opStack.push(boundFunction);
            } else {
              this.opStack.push(value);
            }
            this.ip += 1;
            break;
          }
          case BC.BUILD_LIST: {
            const elementCount = this.code.arg1[this.ip];
            const elements = this.opStack.popN(elementCount);
            this.opStack.push(elements);
            this.ip += 1;
            break;
          }
          case BC.BUILD_MAP: {
            const elementCount = this.code.arg1[this.ip];
            const elements = this.opStack.popN(elementCount * 2);
            const newMap = new MSMap(this);
            for (let i = 0; i < elements.length; i += 2) {
              const mapKey = elements[i];
              const mapValue = elements[i + 1];
              newMap.set(mapKey, mapValue);
            }
            this.opStack.push(newMap);
            this.ip += 1;
            break;
          }
          case BC.NEW_MAP: {
            const parentMap = this.opStack.pop();
            if (!(parentMap instanceof MSMap)) {
              throw new RuntimeError(`Operator "new" can only be used with Maps`);
            }
            const newMap = parentMap.newChildMap();
            this.opStack.push(newMap);
            this.ip += 1;
            break;
          }
          case BC.COMPARE_EQ: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            const result = equals(valueA, valueB);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.COMPARE_NE: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            if (!equals(valueA, valueB)) {
              this.opStack.push(1);
            } else {
              this.opStack.push(0);
            }
            this.ip += 1;
            break;
          }
          case BC.COMPARE_ISA: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            const result = isaEquals(this, valueA, valueB);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.COMPARE_GE: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            const result = greaterEquals(valueA, valueB);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.COMPARE_GT: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            const result = greaterThan(valueA, valueB);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.COMPARE_LE: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            const result = lessEquals(valueA, valueB);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.COMPARE_LT: {
            const valueB = this.opStack.pop();
            const valueA = this.opStack.pop();
            const result = lessThan(valueA, valueB);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.POP_JUMP_FALSE: {
            const jumpAddr = this.code.arg1[this.ip];
            let value = this.opStack.pop();
            value = toBooleanNr(value);
            if (value == 0) {
              this.ip = jumpAddr;
            } else {
              this.ip += 1;
            }
            break;
          }
          case BC.JUMP_IF_TRUE: {
            const jumpAddr = this.code.arg1[this.ip];
            let value = this.opStack.peek();
            value = toBooleanNr(value);
            if (value == 1) {
              this.ip = jumpAddr;
            } else {
              this.ip += 1;
            }
            break;
          }
          case BC.JUMP_IF_FALSE: {
            const jumpAddr = this.code.arg1[this.ip];
            let value = this.opStack.peek();
            value = toBooleanNr(value);
            if (value == 0) {
              this.ip = jumpAddr;
            } else {
              this.ip += 1;
            }
            break;
          }
          case BC.ADD_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = add(this, valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.SUBTRACT_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = subtract(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.MULTIPLY_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = multiply(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.DIVIDE_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = divide(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.POWER_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = power(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.MOD_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = modulus(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.LOGIC_AND_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = logic_and(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.LOGIC_OR_VALUES: {
            const valueInStack_2 = this.opStack.pop();
            const valueInStack_1 = this.opStack.pop();
            const result = logic_or(valueInStack_1, valueInStack_2);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.SUBTR_N: {
            const valueToSubtract = this.code.arg1[this.ip];
            const valueInStack = this.opStack.pop();
            const result = subtract(valueInStack, valueToSubtract);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.DIVIDE_N: {
            const dividend = this.code.arg1[this.ip];
            const valueInStack = this.opStack.pop();
            const result = divide(valueInStack, dividend);
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.NEGATE_BOOLEAN: {
            const valueInStack = this.opStack.pop();
            const booleanNr = toBooleanNr(valueInStack);
            const result = booleanNr == 0 ? 1 : 0;
            this.opStack.push(result);
            this.ip += 1;
            break;
          }
          case BC.NEGATE_NUMBER: {
            const valueInStack = this.opStack.pop();
            if (typeof valueInStack !== "number") {
              throw new RuntimeError(`Value must be a number`);
            } else {
              const result = -1 * valueInStack;
              this.opStack.push(result);
              this.ip += 1;
              break;
            }
          }
          case BC.JUMP: {
            this.ip = this.code.arg1[this.ip];
            break;
          }
          case BC.POP: {
            if (this.opStack.lastValueUndefined) {
              this.opStack.pop();
              this.lastValue = void 0;
            } else {
              this.lastValue = this.opStack.pop();
            }
            this.ip += 1;
            break;
          }
          case BC.CREATE_FOR_LOOP: {
            const forLoopNr = this.code.arg1[this.ip];
            const startAddr = this.opStack.pop();
            const endAddr = this.opStack.pop();
            const values = this.opStack.pop();
            const localVarName = this.opStack.pop();
            const forLoop = new ForLoop(this, startAddr, endAddr, localVarName, values);
            this.forLoopContext.registerForLoop(forLoopNr, forLoop);
            this.ip += 1;
            break;
          }
          case BC.ITERATE_FOR_LOOP: {
            const forLoopNr = this.code.arg1[this.ip];
            const forLoop = this.forLoopContext.getForLoop(forLoopNr);
            if (forLoop.isOver()) {
              this.ip = forLoop.endAddr;
              this.forLoopContext.deleteForLoop(forLoopNr);
            } else {
              const value = forLoop.iterate();
              this.context.setLocal(forLoop.localVarName, value);
              this.ip += 1;
            }
            break;
          }
          case BC.BREAK_FOR_LOOP: {
            const forLoopNr = this.code.arg1[this.ip];
            const forLoop = this.forLoopContext.getForLoop(forLoopNr);
            this.forLoopContext.deleteForLoop(forLoopNr);
            this.ip = forLoop.endAddr;
            break;
          }
          case BC.CONTINUE_FOR_LOOP: {
            const forLoopNr = this.code.arg1[this.ip];
            const forLoop = this.forLoopContext.getForLoop(forLoopNr);
            this.ip = forLoop.startAddr;
            break;
          }
          case BC.PRINT_TOP: {
            const value = this.opStack.pop();
            console.log("Value: " + value);
            this.ip += 1;
            break;
          }
          default: {
            console.log("ip:", this.ip);
            console.error("Bytecode not supported: ", this.code.opCodes[this.ip]);
            throw new RuntimeError("Bytecode not supported: " + this.code.opCodes[this.ip]);
          }
        }
        this.cycleCount++;
      }
    }
    // executeCycles
    isRunning() {
      return !this.isFinished() && !this.isSuspended();
    }
    isFinished() {
      return this.ip >= this.code.opCodes.length;
    }
    isSuspended() {
      return this.suspended;
    }
    stopRunning() {
      this.forceFinish();
      this.cleanupAfterRunning();
    }
    forceFinish() {
      this.opStack.clear();
      this.cycleCount = this.maxCount;
      this.ip = this.code.opCodes.length;
      this.halted = true;
    }
    cleanupAfterRunning() {
      if (this.opStack.count() > 0 && !this.halted) {
        console.info("Stack: ", this.opStack);
        throw new RuntimeError("Stack was not empty!");
      }
      this.onFinished();
    }
    runAtCurrentPosition(code) {
      const promise = new Promise((resolve) => {
        const previousState = new ProcessorState(this);
        const currentContext = this.context;
        const currentGlobalContext = this.globalContext;
        ProcessorState.resetState(this);
        this.prepareForRunning(code, currentContext, currentGlobalContext);
        this.onFinished = () => {
          if (!this.halted) {
            previousState.restoreState(this);
          } else {
            this.onFinished = previousState.onFinished;
          }
          resolve();
        };
        this.runUntilDone();
      });
      return promise;
    }
    yieldExecution() {
      this.cycleCount = this.maxCount;
      this.suspended = false;
    }
    suspendExecution() {
      this.cycleCount = this.maxCount;
      this.suspended = true;
    }
    resumeExecution() {
      if (!this.suspended) {
        return;
      }
      this.suspended = false;
      if (this.runAfterSuspended) {
        this.runUntilDone();
      }
      this.onResumingExecution();
    }
    couldResultInCall() {
      const op = this.code.opCodes[this.ip];
      const result = hasCallPotential(op);
      return result;
    }
    pushFrame() {
      const frame = new Frame(this.code, this.ip, this.context, this.forLoopContext);
      this.savedFrames.push(frame);
      if (this.savedFrames.count() > this.maxCallStackDepth) {
        throw new RuntimeError("Call stack too deep");
      }
    }
    popFrame() {
      const frame = this.savedFrames.pop();
      this.ip = frame.ip;
      this.context = frame.context;
      this.forLoopContext = frame.forLoopContext;
      this.code = frame.code;
    }
    getCurrentSrcLineNr() {
      const optSrcMapEntry = this.code.srcMap.findEntry(this.ip);
      if (optSrcMapEntry !== null) {
        return optSrcMapEntry.srcLoc.start.row;
      } else {
        return void 0;
      }
    }
    getCurrentSrcFileName() {
      const srcFile = this.code.srcMap.srcFile;
      return srcFile;
    }
    selectCoreTypeMap(accessTarget) {
      if (accessTarget instanceof Array) {
        return this.listCoreType;
      } else if (typeof accessTarget === "string") {
        return this.stringCoreType;
      } else if (accessTarget instanceof MSMap) {
        return this.mapCoreType;
      } else if (typeof accessTarget === "number") {
        return this.numberCoreType;
      } else {
        throw new RuntimeError(`No core-type map for value ${accessTarget}`);
      }
    }
    resolveIntrinsic(identifier) {
      const optIntrinsicFn = this.intrinsicsMap.get(identifier);
      return optIntrinsicFn;
    }
    callOrPushValue(value, isFuncRef, accessSrc = void 0, srcMap = null) {
      if (value instanceof BoundFunction && !isFuncRef) {
        this.performCall(value, [], accessSrc, srcMap);
      } else {
        this.opStack.push(value);
        this.ip += 1;
      }
    }
    performCall(maybeFunction, paramValues, dotCallTarget = void 0, srcMap = null) {
      const paramCount = paramValues.length;
      if (!(maybeFunction instanceof BoundFunction)) {
        if (paramCount > 0) {
          throw new RuntimeError(`Too Many Arguments`);
        } else {
          throw new RuntimeError(`Attempting to call a non-function`);
        }
      }
      const boundFunc = maybeFunction;
      const funcDef = boundFunc.funcDef;
      let funcArgCount = funcDef.argNames.length;
      let isNativeSelfFunction = funcDef.isNative() && dotCallTarget !== void 0 && funcDef.argNames.length > 0 && funcDef.argNames[0] === "self";
      if (isNativeSelfFunction) {
        funcArgCount -= 1;
      }
      if (paramCount > funcArgCount) {
        throw new RuntimeError(`Too many parameters calling function.`);
      } else if (paramCount < funcArgCount) {
        const missingArgCount = funcArgCount - paramCount;
        const defaultValues = funcDef.getLastNEffectiveDefaultValues(missingArgCount);
        for (let value of defaultValues) {
          paramValues.push(value);
        }
      }
      if (funcDef.isNative()) {
        const func = funcDef.getFunction();
        if (isNativeSelfFunction) {
          paramValues.unshift(dotCallTarget);
        }
        const retVal = func.apply(this, paramValues);
        if (retVal === _Processor2.abortCallValue) {
          return;
        }
        if (retVal instanceof Promise) {
          this.suspendUntilPromiseResolved(retVal);
        } else {
          this.opStack.push(retVal);
          this.ip += 1;
        }
      } else {
        this.ip += 1;
        this.pushFrame();
        this.code = funcDef.getCode();
        this.context = new Context(this, boundFunc.context);
        this.forLoopContext = new ForLoopContext2();
        this.ip = 0;
        let argNames = funcDef.argNames;
        if (dotCallTarget !== void 0) {
          argNames = argNames.filter((n) => n !== "self");
        }
        for (let i = 0; i < argNames.length; i++) {
          const argName = argNames[i];
          const paramValue = paramValues[i];
          this.context.setLocal(argName, paramValue);
        }
        if (dotCallTarget !== void 0) {
          this.context.setLocal("self", dotCallTarget);
          if (srcMap !== null) {
            if (srcMap.hasParent()) {
              const isaMap = srcMap.parentMap();
              this.context.setLocal("super", isaMap);
            }
          }
        }
      }
    }
    suspendUntilPromiseResolved(promise) {
      this.suspendExecution();
      promise.then((retVal) => {
        this.opStack.push(retVal);
        this.ip += 1;
        this.resumeExecution();
      });
    }
  };
  __publicField(_Processor, "abortCallValue", {});
  var Processor = _Processor;
  var MSMap = class _MSMap {
    constructor(vm) {
      __publicField(this, "mapObj");
      __publicField(this, "valueSetOverrides");
      this.vm = vm;
      this.mapObj = new HashMap();
      this.valueSetOverrides = null;
    }
    get(key) {
      const result = this.getOpt(key);
      if (result === void 0) {
        throw new RuntimeError(`Key Not Found: '${key}' not found in map`);
      } else {
        return result;
      }
    }
    getOpt(key, depth = 0) {
      if (depth > MAX_ISA_RECURSION_DEPTH) {
        throw new RuntimeError(`__isa depth exceeded (perhaps a reference loop?)`);
      }
      if (this.mapObj.has(key)) {
        return this.mapObj.get(key);
      } else if (this.hasParent()) {
        return this.parentMap().getOpt(key, depth + 1);
      } else if (this === this.vm.mapCoreType) {
        return void 0;
      } else {
        return this.vm.mapCoreType.getOpt(key, depth + 1);
      }
    }
    getWithSource(key, depth = 0) {
      if (depth > MAX_ISA_RECURSION_DEPTH) {
        throw new RuntimeError(`__isa depth exceeded (perhaps a reference loop?)`);
      }
      if (this.mapObj.has(key)) {
        return [this.mapObj.get(key), this];
      } else if (this.hasParent()) {
        return this.parentMap().getWithSource(key, depth + 1);
      } else if (this === this.vm.mapCoreType) {
        throw new RuntimeError(`Key Not Found: '${key}' not found in map`);
      } else {
        return this.vm.mapCoreType.getWithSource(key, depth + 1);
      }
    }
    size() {
      return this.mapObj.size();
    }
    // Creates a sub-map / instance, having this
    // as its isa-parent.
    newChildMap() {
      const newMap = new _MSMap(this.vm);
      newMap.set("__isa", this);
      return newMap;
    }
    hasParent() {
      return this.mapObj.has("__isa");
    }
    parentMap() {
      const result = this.mapObj.get("__isa");
      if (result instanceof _MSMap) {
        return result;
      } else {
        throw new RuntimeError("No parent map. Always check first with hasParent()");
      }
    }
    // Makes it possible to execute an action before attempting
    // to set a new value and even change the value to be set.
    overrideSettingValue(key, callback) {
      if (this.valueSetOverrides === null) {
        this.valueSetOverrides = /* @__PURE__ */ new Map();
      }
      this.valueSetOverrides.set(key, callback);
    }
    removeSettingValueOverride(key) {
      if (this.valueSetOverrides instanceof Map) {
        this.valueSetOverrides.delete(key);
      }
    }
    set(key, value) {
      if (this.valueSetOverrides !== null) {
        const overrideFunction = this.valueSetOverrides.get(key);
        if (overrideFunction instanceof Function) {
          value = overrideFunction(value);
        }
      }
      this.mapObj.set(key, value);
    }
    has(key) {
      return this.mapObj.has(key);
    }
    delete(key) {
      this.mapObj.delete(key);
    }
    keys() {
      return this.mapObj.keys();
    }
    values() {
      return this.mapObj.values();
    }
    entries() {
      return this.mapObj.entries();
    }
    isaEquals(type) {
      if (type === this.vm.mapCoreType) {
        return 1;
      } else {
        let p = null;
        p = this.getOpt("__isa");
        while (p != null) {
          if (p === type) {
            return 1;
          }
          if (!(p instanceof _MSMap)) {
            return 0;
          } else {
            p = p.getOpt("__isa");
          }
        }
        return 0;
      }
    }
    toJSMap(depth = 16) {
      return this.mapObj.toMap(depth);
    }
  };
  var RuntimeError = class extends Error {
    constructor(baseMsg) {
      super(`Runtime Error: ${baseMsg}`);
      this.baseMsg = baseMsg;
    }
    setSourceLocation(fileName, lineNr) {
      let location;
      if (fileName !== void 0 && lineNr !== void 0) {
        location = ` [${fileName} line ${lineNr}]`;
      } else if (lineNr !== void 0) {
        location = ` [line ${lineNr}]`;
      } else {
        location = "";
      }
      const msg = `Runtime Error: ${this.baseMsg}${location}`;
      this.message = msg;
    }
  };
  function notEquals(a, b) {
    return equals(a, b) == 1 ? 0 : 1;
  }
  function equals(a, b, recursionDepth = 16) {
    if (recursionDepth < 0) {
      return 1;
    }
    if (a instanceof Array && b instanceof Array) {
      if (a.length !== b.length) {
        return 0;
      } else {
        for (let i = 0; i < a.length; i++) {
          if (a[i] === b[i]) {
            continue;
          }
          if (equals(a[i], b[i], recursionDepth - 1) === 0) {
            return 0;
          }
        }
        return 1;
      }
    } else if (a instanceof MSMap && b instanceof MSMap) {
      if (a.size() !== b.size()) {
        return 0;
      } else {
        for (let aKey of a.keys()) {
          if (!b.has(aKey)) {
            return 0;
          }
          const aValue = a.get(aKey);
          const bValue = b.get(aKey);
          if (equals(aValue, bValue, recursionDepth - 1)) {
            continue;
          } else if (equals(aValue, bValue, recursionDepth - 1) !== 1) {
            return 0;
          }
        }
        return 1;
      }
    } else {
      return a === b ? 1 : 0;
    }
  }
  function isaEquals(vm, value, type) {
    if (value === null) {
      return type === null ? 1 : 0;
    } else if (type === null) {
      return 0;
    } else if (typeof value === "number") {
      return type === vm.numberCoreType ? 1 : 0;
    } else if (typeof value === "string") {
      return type === vm.stringCoreType ? 1 : 0;
    } else if (value instanceof Array) {
      return type === vm.listCoreType ? 1 : 0;
    } else if (value instanceof MSMap) {
      return value.isaEquals(type);
    } else if (value instanceof BoundFunction) {
      return type === vm.funcRefCoreType ? 1 : 0;
    } else {
      return 0;
    }
  }
  function greaterEquals(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a >= b ? 1 : 0;
    } else if (typeof a === "string" && typeof b === "string") {
      return a >= b ? 1 : 0;
    } else {
      return null;
    }
  }
  function greaterThan(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a > b ? 1 : 0;
    } else if (typeof a === "string" && typeof b === "string") {
      return a > b ? 1 : 0;
    } else {
      return null;
    }
  }
  function lessEquals(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a <= b ? 1 : 0;
    } else if (typeof a === "string" && typeof b === "string") {
      return a <= b ? 1 : 0;
    } else {
      return null;
    }
  }
  function lessThan(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a < b ? 1 : 0;
    } else if (typeof a === "string" && typeof b === "string") {
      return a < b ? 1 : 0;
    } else {
      return null;
    }
  }
  function chainedComparison(values, operators) {
    const pairCount = operators.length;
    for (let i = 0; i < pairCount; i++) {
      const operator = operators[i];
      const left = values[i];
      const right = values[i + 1];
      let result;
      if (operator === "==") {
        result = equals(left, right);
      } else if (operator === "!=") {
        result = notEquals(left, right);
      } else if (operator === ">") {
        result = greaterThan(left, right);
      } else if (operator === ">=") {
        result = greaterEquals(left, right);
      } else if (operator === "<") {
        result = lessThan(left, right);
      } else if (operator === "<=") {
        result = lessEquals(left, right);
      } else {
        throw new RuntimeError("Invalid operator");
      }
      if (!result) {
        return 0;
      }
    }
    return 1;
  }
  function add(mapFactory, a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    } else if (typeof a === "string" || typeof b === "string") {
      return toStr(a) + toStr(b);
    } else if (a instanceof Array) {
      if (b instanceof Array) {
        return a.concat(b);
      } else {
        throw new RuntimeError(`Got ${b} instead of another List`);
      }
    } else if (a instanceof MSMap) {
      if (b instanceof MSMap) {
        const combined = mapFactory.newMap();
        for (let e of a.entries()) {
          combined.set(e.key, e.value);
        }
        for (let e of b.entries()) {
          combined.set(e.key, e.value);
        }
        return combined;
      } else {
        throw new RuntimeError(`Got ${toStr(b)} where a Map was required`);
      }
    } else if (a === null) {
      return null;
    } else if (typeof a === "number" && b === null) {
      return a;
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot add ${formatValue(a, true)} + ${formatValue(b, true)}`);
    }
  }
  function subtract(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    } else if (typeof a === "string" && typeof b === "string") {
      const suffixIdx = a.lastIndexOf(b);
      const matchIdx = a.length - b.length;
      if (suffixIdx >= 0 && suffixIdx == matchIdx) {
        return a.substring(0, suffixIdx);
      } else {
        return a;
      }
    } else if (a === null) {
      return null;
    } else if (typeof a === "number" && b === null) {
      return a;
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot subtract ${formatValue(a, true)} - ${formatValue(b, true)}`);
    }
  }
  function divide(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a / b;
    } else if (a === null) {
      return null;
    } else if (typeof a === "number" && b === null) {
      return a / 0;
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot divide ${formatValue(a, true)} / ${formatValue(b, true)}`);
    }
  }
  function multiply(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a * b;
    } else if (a instanceof Array || typeof a === "string") {
      if (typeof b === "number") {
        let result = typeof a === "string" ? "" : new Array();
        if (b > 0) {
          const repetitionCount = Math.floor(b);
          for (let i = 0; i < repetitionCount; i++) {
            result = result.concat(a);
          }
          const additionalElementsSliceEnd = Math.floor(b % 1 * a.length);
          const additionalElements = a.slice(0, additionalElementsSliceEnd);
          result = result.concat(additionalElements);
        }
        return result;
      } else {
        throw new RuntimeError(`Number required for replication. Got ${b} instead.`);
      }
    } else if (a === null) {
      return null;
    } else if (typeof a === "number" && b === null) {
      return 0;
    } else {
      console.error("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot multiply ${formatValue(a, true)} * ${formatValue(b, true)}`);
    }
  }
  function power(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return Math.pow(a, b);
    } else if (a === null) {
      return null;
    } else if (typeof a === "number" && b === null) {
      return 1;
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot raise to the power ${formatValue(a, true)} ^ ${formatValue(b, true)}`);
    }
  }
  function modulus(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a % b;
    } else if (a === null) {
      return null;
    } else if (typeof a === "number" && b === null) {
      return a % 0;
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot perform modulus ${formatValue(a, true)} % ${formatValue(b, true)}`);
    }
  }
  function logic_and(a, b) {
    a = toBooleanNr(a);
    b = toBooleanNr(b);
    if (typeof a === "number" && typeof b === "number") {
      return absClamp01(a * b);
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot perform ${formatValue(a, true)} && ${formatValue(b, true)}`);
    }
  }
  function logic_or(a, b) {
    a = toBooleanNr(a);
    b = toBooleanNr(b);
    if (typeof a === "number" && typeof b === "number") {
      return absClamp01(a + b - a * b);
    } else {
      console.info("Not supported for values", "a:", a, "b:", b);
      throw new RuntimeError(`Cannot perform ${formatValue(a, true)} || ${formatValue(b, true)}`);
    }
  }
  function absClamp01(value) {
    if (value < 0)
      value = -value;
    if (value > 1)
      return 1;
    return value;
  }
  function slice(vm, sliceTarget, startIdx, endIdx) {
    if (!(sliceTarget instanceof Array || typeof sliceTarget === "string")) {
      throw new RuntimeError(`Slice target must be List or String [line ${vm.getCurrentSrcLineNr()}]`);
    }
    if (startIdx !== null) {
      checkInt(startIdx, `Slice-start should be an integer value [line ${vm.getCurrentSrcLineNr()}]`);
      startIdx = computeSliceIndex(sliceTarget, startIdx);
    } else {
      startIdx = 0;
    }
    if (endIdx !== null) {
      checkInt(endIdx, `Slice-end should be an integer value [line ${vm.getCurrentSrcLineNr()}]`);
      endIdx = computeSliceIndex(sliceTarget, endIdx);
    } else {
      endIdx = sliceTarget.length;
    }
    const newCollection = sliceTarget.slice(startIdx, endIdx);
    return newCollection;
  }
  function computeAccessIndex(accessTarget, index) {
    const intIdx = toIntegerValue(index);
    const effectiveIndex = intIdx < 0 ? intIdx + accessTarget.length : intIdx;
    if (effectiveIndex < 0 || effectiveIndex >= accessTarget.length) {
      throw new RuntimeError(`Index Error (list index ${index} out of range)`);
    }
    return effectiveIndex;
  }
  function computeSliceIndex(accessTarget, index) {
    const effectiveIndex = index < 0 ? index + accessTarget.length : index;
    if (effectiveIndex < 0) {
      return 0;
    } else if (effectiveIndex >= accessTarget.length) {
      return accessTarget.length;
    }
    return effectiveIndex;
  }
  function computeMathAssignValue(mapFactory, currentValue, opTokenType, operand) {
    switch (opTokenType) {
      case TokenType.PLUS_ASSIGN:
        return add(mapFactory, currentValue, operand);
      case TokenType.MINUS_ASSIGN:
        return subtract(currentValue, operand);
      case TokenType.DIV_ASSIGN:
        return divide(currentValue, operand);
      case TokenType.MULT_ASSIGN:
        return multiply(currentValue, operand);
      case TokenType.MOD_ASSIGN:
        return modulus(currentValue, operand);
      case TokenType.POW_ASSIGN:
        return power(currentValue, operand);
      default:
        throw new RuntimeError("Invalid token-type: " + TokenType[opTokenType]);
    }
  }
  function toBooleanNr(value) {
    if (value === null) {
      return 0;
    } else if (typeof value == "number") {
      return value;
    } else if (value instanceof Array) {
      return value.length;
    } else if (typeof value === "string") {
      return value.length > 0 ? 1 : 0;
    } else if (value instanceof MSMap) {
      return value.size() > 0 ? 1 : 0;
    } else {
      throw new RuntimeError("Type not supported: " + value);
    }
  }
  function toStr(a) {
    if (typeof a === "number") {
      return "" + a;
    } else if (typeof a === "string") {
      return a;
    } else {
      return formatValue(a);
    }
  }
  function toNumberValue(value) {
    if (typeof value === "number") {
      return value;
    } else {
      return 0;
    }
  }
  function toIntegerValue(value) {
    if (typeof value == "number") {
      return Math.trunc(value);
    } else {
      return 0;
    }
  }
  function round(n, decimalPlaces) {
    if (typeof n === "number" && typeof decimalPlaces === "number") {
      if (decimalPlaces >= 0) {
        const places = Math.pow(10, decimalPlaces);
        return Math.round(n * places) / places;
      } else {
        const pow10Nr = Math.pow(10, -decimalPlaces);
        return Math.round(n / pow10Nr) * pow10Nr;
      }
    } else {
      return void 0;
    }
  }
  function hashCode(value, recursionDepth = 16) {
    if (value === null) {
      return -1;
    } else if (value instanceof Array) {
      return listHashCode(value, recursionDepth - 1);
    } else if (value instanceof MSMap) {
      return mapHashCode(value, recursionDepth - 1);
    } else {
      const valueStr = toStr(value);
      return stringHashCode(valueStr);
    }
  }
  function listHashCode(list, recursionDepth = 16) {
    let result = hashCode(list.length);
    if (recursionDepth < 1) {
      return result;
    }
    for (let i = 0; i < list.length; i++) {
      const value = list[i];
      if (value != null) {
        result ^= hashCode(value, recursionDepth - 1);
      }
    }
    return result;
  }
  function mapHashCode(map, recursionDepth = 16) {
    let result = stringHashCode(toStr(map.size));
    if (recursionDepth < 0) {
      return result;
    }
    for (let { key, value } of map.entries()) {
      result ^= hashCode(key, recursionDepth - 1);
      if (value != null) {
        result ^= hashCode(value, recursionDepth - 1);
      }
    }
    return result;
  }
  function stringHashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }
  function getRandomInt(vm, max) {
    return Math.floor(vm.random() * max);
  }
  function checkRange(i, min, max, desc = "index") {
    if (i < min || i > max) {
      throw new RuntimeError(`Index Error: ${desc} (${i}) out of range (${min} to ${max})`);
    }
  }
  function checkNumber(arg, errorMsg, vm = null) {
    if (Number.isFinite(arg)) {
      return;
    } else if (vm instanceof Processor) {
      throw new RuntimeError(errorMsg);
    } else {
      throw new RuntimeError(errorMsg);
    }
  }
  function checkInt(arg, errorMsg, vm = null) {
    if (Number.isInteger(arg)) {
      return;
    } else if (vm instanceof Processor) {
      throw new RuntimeError(errorMsg);
    } else {
      throw new RuntimeError(errorMsg);
    }
  }
  function isNullOrEmpty(str) {
    if (str === null) {
      return true;
    } else if (typeof str === "string") {
      return str === "";
    } else {
      throw new RuntimeError("Invalid argument: " + str);
    }
  }
  function formatValue(value, quoteStrings = false, depth = 16) {
    let text = "";
    if (typeof value === "number") {
      text = formatNumber(value);
    } else if (value instanceof Array) {
      if (depth < 0) {
        return "[ a List ]";
      }
      const formattedValues = [];
      for (const e of value) {
        formattedValues.push(formatValue(e, true, depth - 12));
      }
      text = "[" + formattedValues.join(", ") + "]";
    } else if (value instanceof MSMap) {
      if (depth < 0) {
        return "{ a Map }";
      }
      const formattedPairs = [];
      for (let e of value.entries()) {
        const formattedKey = formatValue(e.key, true, depth - 15);
        const formattedValue = formatValue(e.value, true, depth - 14);
        const formattedPair = formattedKey + ": " + formattedValue;
        formattedPairs.push(formattedPair);
      }
      text = "{" + formattedPairs.join(", ") + "}";
    } else if (typeof value === "string" && quoteStrings) {
      text = '"' + value + '"';
    } else if (typeof value === "boolean") {
      return value ? "1" : "0";
    } else if (value instanceof BoundFunction) {
      const formattedArgs = [];
      for (let arg of value.funcDef.arguments) {
        if (arg.defaultValue !== void 0) {
          formattedArgs.push(`${arg.name}=${arg.defaultValue}`);
        } else {
          formattedArgs.push(`${arg.name}`);
        }
      }
      const joinedArgs = formattedArgs.join(", ");
      return `FUNCTION(${joinedArgs})`;
    } else {
      text = "" + value;
    }
    return text;
  }
  function formatNumber(value) {
    const isFloat = !Number.isInteger(value) && Number.isFinite(value);
    let text = "";
    if (isFloat) {
      if (value > 1e10 || value < -1e10 || value < 1e-6 && value > -1e-6) {
        text = value.toExponential(6);
        text = text.replace(/[eE]([-+])(\d)$/, "E$10$2");
      } else {
        text = "" + (round(value, 6) || 0);
      }
    } else {
      text = value.toString();
    }
    return text;
  }
  function addBitOperationIntrinsics(p) {
    p.addIntrinsic(
      "bitAnd(i=0,j=0)",
      function(i, j) {
        i = toIntegerValue(i);
        j = toIntegerValue(j);
        return i & j;
      }
    );
    p.addIntrinsic(
      "bitOr(i=0,j=0)",
      function(i, j) {
        i = toIntegerValue(i);
        j = toIntegerValue(j);
        return i | j;
      }
    );
    p.addIntrinsic(
      "bitXor(i=0,j=0)",
      function(i, j) {
        i = toIntegerValue(i);
        j = toIntegerValue(j);
        return i ^ j;
      }
    );
  }
  function addCharIntrinsics(p) {
    p.addIntrinsic(
      "code(self)",
      function(x) {
        if (x !== null) {
          const s = toStr(x);
          if (x === "") {
            return null;
          }
          const result = s.charCodeAt(0);
          return result;
        } else {
          return 0;
        }
      }
    );
    p.addIntrinsic(
      "char(n)",
      function(x) {
        if (typeof x === "number" && x > 0) {
          const s = String.fromCharCode(x);
          return s;
        }
        return String.fromCharCode(0);
      }
    );
  }
  function addCollectionIntrinsics(p) {
    p.addIntrinsic(
      "range(start,stop,step=null)",
      function(start, stop, step) {
        start = toNumberValue(start);
        stop = toNumberValue(stop);
        const result = [];
        if (start === stop) {
          return [start];
        } else if (start < stop) {
          step = step === null ? 1 : step;
          checkNumber(step, "Argument 'step' should be a number", p);
          if (step <= 0) {
            return new Array();
          }
          for (let i = start; i <= stop; i += step) {
            result.push(i);
          }
        } else {
          step = step === null ? -1 : step;
          checkNumber(step, "Argument 'step' should be a number", p);
          if (step >= 0) {
            return new Array();
          }
          for (let i = start; i >= stop; i += step) {
            result.push(i);
          }
        }
        return result;
      }
    );
    p.addIntrinsic(
      "len(self)",
      function(self) {
        if (self instanceof Array || typeof self === "string") {
          return self.length;
        } else if (self instanceof MSMap) {
          return self.size();
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      "sum(self)",
      function(self) {
        let list;
        if (self instanceof Array) {
          list = self;
        } else if (self instanceof MSMap) {
          list = Array.from(self.values());
        } else {
          return 0;
        }
        let total = 0;
        for (let e of list) {
          total += toNumberValue(e);
        }
        return total;
      }
    );
    p.addIntrinsic(
      "insert(self,index,value)",
      function(self, index, value) {
        if (index === null) {
          throw new RuntimeError("index argument required");
        }
        if (typeof index !== "number") {
          throw new RuntimeError("number required for index argument");
        }
        index = toIntegerValue(index);
        if (index < 0) {
          index += self.length + 1;
        }
        checkRange(index, 0, self.length);
        if (self instanceof Array) {
          self.splice(index, 0, value);
        } else if (typeof self === "string") {
          const valueStr = toStr(value);
          const result = [self.slice(0, index), valueStr, self.slice(index)].join("");
          return result;
        } else {
          throw new RuntimeError("insert called on an invalid type");
        }
      }
    );
    p.addIntrinsic(
      "remove(self,k)",
      function(self, k) {
        if (self instanceof MSMap) {
          if (self.has(k)) {
            self.delete(k);
            return 1;
          } else {
            return 0;
          }
        } else if (self instanceof Array) {
          if (k == null) {
            throw new RuntimeError("argument to 'remove' must not be null");
          }
          let index = toIntegerValue(k);
          if (index < 0) {
            index += self.length;
          }
          checkRange(index, 0, self.length - 1);
          self.splice(index, 1);
          return null;
        } else if (typeof self === "string") {
          if (k == null) {
            throw new RuntimeError("argument to 'remove' must not be null");
          }
          const s = toStr(k);
          const foundPos = s.indexOf(k);
          if (foundPos < 0) {
            return self;
          }
          const result = self.replace(k, "");
          return result;
        }
        throw new RuntimeError("Type Error: 'remove' requires map, list, or string");
      }
    );
    p.addIntrinsic(
      "replace(self,oldVal,newVal,maxCount=null)",
      function(self, oldVal, newVal, maxCountVal) {
        if (self === null) {
          throw new RuntimeError("argument to 'replace' must not be null");
        }
        let maxCount = -1;
        if (maxCountVal !== null) {
          maxCount = toIntegerValue(maxCountVal);
          if (maxCount < 1) {
            return self;
          }
        }
        let count = 0;
        if (self instanceof MSMap) {
          const keysToChange = [];
          for (let key of self.keys()) {
            const value = self.get(key);
            if (equals(value, oldVal)) {
              keysToChange.push(key);
              count += 1;
              if (maxCount > 0 && count === maxCount) {
                break;
              }
            }
          }
          for (let key of keysToChange) {
            self.set(key, newVal);
          }
          return self;
        } else if (self instanceof Array) {
          for (let i = 0; i < self.length; i++) {
            if (equals(self[i], oldVal)) {
              self[i] = newVal;
              count++;
            }
            if (maxCount > 0 && count == maxCount) {
              break;
            }
          }
          return self;
        } else if (typeof self === "string") {
          let str = toStr(self);
          let oldstr = oldVal === null ? "" : toStr(oldVal);
          if (isNullOrEmpty(oldstr)) {
            throw new RuntimeError("replace: oldval argument is empty");
          }
          let newstr = newVal == null ? "" : toStr(newVal);
          let idx = 0;
          while (true) {
            idx = str.indexOf(oldstr, idx);
            if (idx < 0) {
              break;
            }
            str = str.substring(0, idx) + newstr + str.substring(idx + oldstr.length);
            idx += newstr.length;
            count++;
            if (maxCount > 0 && count == maxCount) {
              break;
            }
          }
          return str;
        }
        throw new RuntimeError("Type Error: 'replace' requires map, list, or string");
      }
    );
    p.addIntrinsic(
      "slice(seq,from=0,to=null)",
      function(sequence, fromIdx, toIdx) {
        const newCollection = slice(p, sequence, fromIdx, toIdx);
        return newCollection;
      }
    );
    p.addIntrinsic(
      'split(self,delimiter=" ",maxCount=-1)',
      function(self, delimiter, maxCount) {
        self = toStr(self);
        delimiter = toStr(delimiter);
        maxCount = toIntegerValue(maxCount);
        let result = [];
        let pos = 0;
        while (pos < self.length) {
          let nextPos;
          if (maxCount >= 0 && result.length == maxCount - 1) {
            nextPos = self.length;
          } else if (delimiter.length == 0) {
            nextPos = pos + 1;
          } else {
            nextPos = self.indexOf(delimiter, pos);
          }
          if (nextPos < 0) {
            nextPos = self.length;
          }
          result.push(self.substring(pos, nextPos));
          pos = nextPos + delimiter.length;
          if (pos == self.length && delimiter.length > 0) {
            result.push("");
          }
        }
        return result;
      }
    );
    p.addIntrinsic(
      "indexOf(self,value,after=null)",
      function(self, value, after) {
        if (self instanceof Array || typeof self === "string") {
          let afterIdx = after !== null ? after : -1;
          if (afterIdx < -1) {
            afterIdx += self.length;
          }
          if (afterIdx < -1 || afterIdx >= self.length - 1) {
            return null;
          }
          const idx = self.indexOf(value, afterIdx + 1);
          return idx >= 0 ? idx : null;
        } else if (self instanceof MSMap) {
          let startSearch = after == null ? true : false;
          for (let key of self.keys()) {
            if (startSearch) {
              const mapValue = self.get(key);
              if (mapValue === value) {
                return key;
              }
            } else if (key === after) {
              startSearch = true;
            }
          }
          return null;
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      'join(self,delimiter=" ")',
      function(self, delimiter) {
        const delim = toStr(delimiter);
        if (!(self instanceof Array)) {
          return self;
        } else {
          const list = [];
          for (let value of self) {
            if (value === null) {
              list.push("");
            } else {
              list.push(toStr(value));
            }
          }
          const result = list.join(delim);
          return result;
        }
      }
    );
    p.addIntrinsic(
      "hasIndex(self,index)",
      function(self, index) {
        if (self instanceof MSMap) {
          return self.has(index) ? 1 : 0;
        } else if (self instanceof Array || typeof self === "string") {
          if (typeof index === "number" && self.length > 0) {
            return index >= -self.length && index < self.length ? 1 : 0;
          } else {
            return 0;
          }
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      "pop(self)",
      function(self) {
        if (self instanceof Array) {
          if (self.length < 1) {
            return null;
          }
          const result = self.pop();
          return result;
        } else if (self instanceof MSMap) {
          if (self.size() < 1) {
            return null;
          }
          const firstKey = self.keys()[0];
          self.delete(firstKey);
          return firstKey;
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      "pull(self)",
      function(self) {
        if (self instanceof Array) {
          if (self.length < 1) {
            return null;
          }
          const result = self[0];
          self.splice(0, 1);
          return result;
        } else if (self instanceof MSMap) {
          if (self.size() < 1) {
            return null;
          }
          const firstKey = self.keys()[0];
          self.delete(firstKey);
          return firstKey;
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      "push(self,value)",
      function(self, value) {
        if (self instanceof Array) {
          self.push(value);
          return self;
        } else if (self instanceof MSMap) {
          self.set(value, 1);
          return self;
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      "indexes(self)",
      function(self) {
        if (self instanceof MSMap) {
          const keys = Array.from(self.keys());
          return keys;
        } else if (self instanceof Array || typeof self === "string") {
          const indexes = [];
          for (let i = 0; i < self.length; i++) {
            indexes.push(i);
          }
          return indexes;
        } else {
          return null;
        }
      }
    );
    p.addIntrinsic(
      "values(self)",
      function(self) {
        if (self instanceof MSMap) {
          const values = Array.from(self.values());
          return values;
        } else if (typeof self === "string") {
          const letters = Array.from(self);
          return letters;
        } else {
          return self;
        }
      }
    );
    p.addIntrinsic(
      "sort(self,byKey=null,ascending=1)",
      function(self, byKey, ascending) {
        const compareSameType = (a, b) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        };
        const compareByValues = (a, b) => {
          if (a === null) {
            if (b === null) {
              return 0;
            } else {
              return 1;
            }
          }
          if (b === null) {
            return -1;
          }
          if (typeof a === "string" || typeof b === "string") {
            const aStr = toStr(a);
            const bStr = toStr(b);
            return compareSameType(aStr, bStr);
          }
          if (typeof a === "number" && typeof b === "number") {
            return compareSameType(a, b);
          }
          return 0;
        };
        const compareByKeys = (a, b) => {
          return compareByValues(a.sortKey, b.sortKey);
        };
        if (!(self instanceof Array)) {
          return self;
        }
        if (self.length < 2) {
          return self;
        }
        if (byKey === null) {
          self.sort(compareByValues);
        } else {
          const intKey = toIntegerValue(byKey);
          const keyedList = [];
          for (let i = 0; i < self.length; i++) {
            const value = self[i];
            let sortKey = null;
            if (value instanceof MSMap) {
              sortKey = value.getOpt(byKey) || null;
            } else if (value instanceof Array) {
              if (intKey > -value.length && intKey < value.length) {
                const normalizedIdx = intKey % value.length;
                sortKey = value[normalizedIdx];
              }
            }
            const keyedValue = {
              sortKey,
              value
            };
            keyedList.push(keyedValue);
          }
          keyedList.sort(compareByKeys);
          self.splice(0, self.length);
          for (let keyedValue of keyedList) {
            self.push(keyedValue.value);
          }
        }
        if (toBooleanNr(ascending) === 0) {
          self.reverse();
        }
        return self;
      }
    );
  }
  function addConversionIntrinsics(p) {
    p.addIntrinsic(
      "str(self)",
      function(value) {
        const result = formatValue(value);
        return result;
      }
    );
    p.addIntrinsic(
      "val(self)",
      function(x) {
        if (typeof x === "number") {
          return x;
        } else if (typeof x === "string") {
          let result = Number(x);
          if (isNaN(result)) {
            return 0;
          } else {
            return result;
          }
        } else {
          return null;
        }
      }
    );
  }
  function addCoreTypesIntrinsics(p) {
    p.addIntrinsic(
      "string",
      function() {
        return p.stringCoreType;
      }
    );
    p.addIntrinsic(
      "list",
      function() {
        return p.listCoreType;
      }
    );
    p.addIntrinsic(
      "map",
      function() {
        return p.mapCoreType;
      }
    );
    p.addIntrinsic(
      "number",
      function() {
        return p.numberCoreType;
      }
    );
    p.addIntrinsic(
      "funcRef",
      function() {
        return p.funcRefCoreType;
      }
    );
  }
  function addIdentityIntrinsics(p) {
    p.addIntrinsic(
      "hash(obj)",
      function(obj) {
        return hashCode(obj);
      }
    );
    p.addIntrinsic(
      "refEquals(a,b",
      function(a, b) {
        let result = false;
        if (a === null) {
          result = b === null;
        } else if (typeof a === "number") {
          result = typeof b === "number" && a === b;
        } else if (typeof a === "string") {
          result = typeof b === "string" && a === b;
        } else if (a instanceof Array) {
          result = b instanceof Array && a === b;
        } else if (a instanceof MSMap) {
          result = b instanceof MSMap && a === b;
        } else if (a instanceof BoundFunction) {
          result = b instanceof BoundFunction && a === b;
        } else {
          result = equals(a, b) === 1;
        }
        return result ? 1 : 0;
      }
    );
  }
  function addMathIntrinsics(p) {
    p.addIntrinsic(
      "abs(x)",
      function(x) {
        if (typeof x === "number") {
          return Math.abs(x);
        } else {
          return 0;
        }
      }
    );
    p.addIntrinsic(
      "floor(n)",
      function(n) {
        if (typeof n === "number") {
          return Math.floor(n);
        } else {
          return 0;
        }
      }
    );
    p.addIntrinsic(
      "ceil(n)",
      function(n) {
        if (typeof n === "number") {
          return Math.ceil(n);
        } else {
          return 0;
        }
      }
    );
    p.addIntrinsic(
      "round(n,decimalPlaces=0)",
      function(n, decimalPlaces) {
        const result = round(n, decimalPlaces);
        if (result !== void 0) {
          return result;
        } else {
          return 0;
        }
      }
    );
    p.addIntrinsic(
      "pi",
      function() {
        return Math.PI;
      }
    );
    p.addIntrinsic(
      "sin(x)",
      function(x) {
        return Math.sin(x);
      }
    );
    p.addIntrinsic(
      "cos(x)",
      function(x) {
        return Math.cos(x);
      }
    );
    p.addIntrinsic(
      "tan(x)",
      function(x) {
        return Math.tan(x);
      }
    );
    p.addIntrinsic(
      "asin(x)",
      function(x) {
        return Math.asin(x);
      }
    );
    p.addIntrinsic(
      "acos(x)",
      function(x) {
        return Math.acos(x);
      }
    );
    p.addIntrinsic(
      "atan(x)",
      function(x) {
        return Math.atan(x);
      }
    );
    p.addIntrinsic(
      "sign(n)",
      function(n) {
        if (typeof n === "number") {
          if (n > 0) {
            return 1;
          } else if (n < 0) {
            return -1;
          }
        }
        return 0;
      }
    );
    p.addIntrinsic(
      "log(x,base=10)",
      function(x, base) {
        if (typeof x === "number" && typeof base === "number") {
          return Math.log(x) / Math.log(base);
        }
        return 0;
      }
    );
    p.addIntrinsic(
      "sqrt(x)",
      function(x) {
        if (typeof x === "number") {
          return Math.sqrt(x);
        }
        return 0;
      }
    );
  }
  function addPrintIntrinsic(p) {
    let stdoutBuffer = [];
    p.addIntrinsic(
      'print(s="",delimiter=null)',
      function(value, delimiter) {
        if (delimiter === null) {
          delimiter = "\n";
        }
        delimiter = toStr(delimiter);
        let text = formatValue(value) + delimiter;
        const delimiterIdxAndLength = (s) => {
          let idx = s.indexOf("\n\r");
          if (idx >= 0) {
            return [idx, 2];
          }
          idx = s.indexOf("\r\n");
          if (idx >= 0) {
            return [idx, 2];
          }
          idx = s.indexOf("\n");
          if (idx >= 0) {
            return [idx, 1];
          }
          idx = s.indexOf("\r");
          return [idx, 1];
        };
        while (text.length > 0) {
          const [nextIdx, delimLen] = delimiterIdxAndLength(text);
          if (nextIdx < 0) {
            stdoutBuffer.push(text);
            return;
          } else {
            const part = text.slice(0, nextIdx);
            const rest = text.slice(nextIdx + delimLen);
            text = rest;
            stdoutBuffer.push(part);
            const joined = stdoutBuffer.join("");
            p.stdoutCallback(joined);
            stdoutBuffer = [];
          }
        }
      }
    );
  }
  function addRandomnessIntrinsics(p) {
    p.addIntrinsic(
      "rnd(seed)",
      function(seed) {
        if (seed !== null) {
          seed = toIntegerValue(seed);
          p.initRandomGenerator(seed);
        }
        return p.random();
      }
    );
    p.addIntrinsic(
      "shuffle(self)",
      function(self) {
        if (self instanceof Array) {
          for (let idx = self.length - 1; idx >= 1; idx--) {
            const rndIdx = getRandomInt(p, idx + 1);
            const tempValue = self[rndIdx];
            self[rndIdx] = self[idx];
            self[idx] = tempValue;
          }
        } else if (self instanceof MSMap) {
          const keys = Array.from(self.keys());
          for (let keyIdx = keys.length - 1; keyIdx >= 1; keyIdx--) {
            const rndIdx = getRandomInt(p, keyIdx + 1);
            const key = keys[keyIdx];
            const rndKey = keys[rndIdx];
            const tempValue = self.get(rndKey);
            self.set(rndKey, self.get(key));
            self.set(key, tempValue);
          }
        }
        return null;
      }
    );
  }
  function addSchedulingIntrinsics(p) {
    p.addIntrinsic(
      "time",
      function() {
        const t0 = p.executionStartTime;
        const t1 = performance.now();
        return (t1 - t0) / 1e3;
      }
    );
    p.addIntrinsic(
      "wait(seconds=1.0)",
      function(seconds) {
        seconds = toNumberValue(seconds);
        const milliseconds = seconds * 1e3;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, milliseconds);
        });
      }
    );
    p.addIntrinsic(
      "yield",
      function() {
        p.yieldExecution();
      }
    );
    p.addIntrinsic(
      "exit",
      function() {
        p.stopRunning();
        return Processor.abortCallValue;
      }
    );
  }
  function addStringIntrinsics(p) {
    p.addIntrinsic(
      "upper(self)",
      function(value) {
        if (typeof value === "string") {
          return value.toUpperCase();
        } else {
          return value;
        }
      }
    );
    p.addIntrinsic(
      "lower(self)",
      function(value) {
        if (typeof value === "string") {
          return value.toLowerCase();
        } else {
          return value;
        }
      }
    );
  }
  function addStandardIntrinsics(p) {
    addPrintIntrinsic(p);
    addCoreTypesIntrinsics(p);
    addMathIntrinsics(p);
    addBitOperationIntrinsics(p);
    addCharIntrinsics(p);
    addCollectionIntrinsics(p);
    addConversionIntrinsics(p);
    addIdentityIntrinsics(p);
    addRandomnessIntrinsics(p);
    addSchedulingIntrinsics(p);
    addStringIntrinsics(p);
    addBaseTypesIntrinsics(p);
  }
  function addBaseTypesIntrinsics(p) {
    const listIntrinsicNames = [
      "len",
      "indexOf",
      "indexes",
      "hasIndex",
      "sum",
      "sort",
      "push",
      "pull",
      "pop",
      "values",
      "insert",
      "remove",
      "replace",
      "join",
      "shuffle"
    ];
    const stringIntrinsicNames = [
      "len",
      "indexOf",
      "indexes",
      "hasIndex",
      "upper",
      "lower",
      "values",
      "insert",
      "remove",
      "replace",
      "split",
      "val",
      "code"
    ];
    const mapIntrinsicNames = [
      "len",
      "indexOf",
      "indexes",
      "hasIndex",
      "sum",
      "push",
      "pull",
      "pop",
      "values",
      "remove",
      "replace",
      "shuffle"
    ];
    const getFn = (name) => {
      const optFn = p.globalContext.getOpt(name);
      if (optFn !== void 0) {
        return optFn;
      } else {
        throw new Error("Intrinsic not found: " + name);
      }
    };
    const importIntrinsics = (targetList, intrinsicNames) => {
      for (let fnName of intrinsicNames) {
        const boundFn = getFn(fnName);
        const argNames = boundFn.funcDef.argNames;
        if (argNames.length < 1 || argNames[0] !== "self") {
          throw new Error(`First parameter of ${fnName} must be 'self'. Found: ${argNames}`);
        }
        p.attachExistingIntrinsic(targetList, fnName, boundFn);
      }
    };
    importIntrinsics(p.listCoreType, listIntrinsicNames);
    importIntrinsics(p.mapCoreType, mapIntrinsicNames);
    importIntrinsics(p.stringCoreType, stringIntrinsicNames);
  }
  var ParserError = class extends Error {
    constructor(message, position) {
      const msg = `Compiler Error: ${message} [line ${position.row}]`;
      super(msg);
      this.position = position;
    }
  };
  var SrcLocation = class _SrcLocation {
    constructor(start, end, source) {
      __publicField(this, "start");
      __publicField(this, "end");
      __publicField(this, "source");
      if (start.idx > end.idx) {
        throw new Error("Start must be less than end");
      }
      this.start = start;
      this.end = end;
      if (source !== void 0) {
        this.source = source;
      } else {
        this.source = "inline";
      }
    }
    static forTokenRange(firstToken, lastToken) {
      const firstLocation = firstToken.location;
      const lastLocation = lastToken.location;
      return firstLocation.upTo(lastLocation);
    }
    upTo(otherLocation) {
      if (otherLocation.start.idx < this.end.idx) {
        throw new Error("The other location must be further ahead than the first one");
      }
      const newStart = this.start;
      const newEnd = otherLocation.end;
      const newLocation = new _SrcLocation(newStart, newEnd, this.source);
      return newLocation;
    }
    toString() {
      return `[(row:${this.start.row},col:${this.start.col}) to (row:${this.end.row},col:${this.end.col})]`;
    }
  };
  var Pos = class _Pos {
    constructor(idx, col, row) {
      __publicField(this, "idx");
      __publicField(this, "col");
      __publicField(this, "row");
      this.idx = idx;
      this.col = col;
      this.row = row;
    }
    copy() {
      return new _Pos(this.idx, this.col, this.row);
    }
    advance() {
      this.idx = this.idx + 1;
      this.col = this.col + 1;
    }
    moveToNewLine() {
      this.idx = this.idx;
      this.col = 1;
      this.row = this.row + 1;
    }
    toString() {
      return `(idx=${this.idx},row=${this.row},col=${this.col})`;
    }
  };
  var SimpleToken = class {
    constructor(tokenType, location, afterSpace) {
      __publicField(this, "tokenType");
      __publicField(this, "location");
      __publicField(this, "afterSpace");
      this.tokenType = tokenType;
      this.location = location;
      this.afterSpace = afterSpace;
    }
    toString() {
      return `SimpleToken(tokenType=${TokenType[this.tokenType]},position=${this.location.toString()},afterSpace=${this.afterSpace})`;
    }
  };
  var LiteralToken = class {
    constructor(tokenType, value, position, afterSpace) {
      __publicField(this, "value");
      __publicField(this, "tokenType");
      __publicField(this, "location");
      __publicField(this, "afterSpace");
      this.tokenType = tokenType;
      this.value = value;
      this.location = position;
      this.afterSpace = afterSpace;
    }
    toString() {
      let strValue;
      if (this.tokenType == TokenType.STRING_LITERAL) {
        strValue = `"${this.value}"`;
      } else {
        strValue = `${this.value}`;
      }
      return `LiteralToken(tokenType=${TokenType[this.tokenType]},value=${strValue},position=${this.location.toString()},afterSpace=${this.afterSpace})`;
    }
  };
  var StringLiteral = class extends LiteralToken {
    constructor(value, location, afterSpace) {
      super(TokenType.STRING_LITERAL, value, location, afterSpace);
    }
  };
  var IntLiteral = class extends LiteralToken {
    constructor(value, location, afterSpace) {
      super(TokenType.INT_LITERAL, value, location, afterSpace);
    }
  };
  var FloatLiteral = class extends LiteralToken {
    constructor(value, location, afterSpace) {
      super(TokenType.FLOAT_LITERAL, value, location, afterSpace);
    }
  };
  var Identifier = class {
    constructor(value, location, afterSpace) {
      __publicField(this, "value");
      __publicField(this, "tokenType");
      __publicField(this, "location");
      __publicField(this, "afterSpace");
      this.tokenType = TokenType.IDENTIFIER_TK;
      this.value = value;
      this.location = location;
      this.afterSpace = afterSpace;
    }
    toString() {
      return `Identifier(value="${this.value}",position=${this.location.toString()},afterSpace=${this.afterSpace})`;
    }
  };
  var EofToken = class {
    constructor(location, afterSpace) {
      __publicField(this, "tokenType");
      __publicField(this, "location");
      __publicField(this, "afterSpace");
      this.tokenType = TokenType.EOF;
      this.location = location;
      this.afterSpace = afterSpace;
    }
    toString() {
      return `EofToken(position=${this.location.toString()},afterSpace=${this.afterSpace})`;
    }
  };
  var NumberLiteral = class {
    constructor(isInt, numberValue) {
      __publicField(this, "isInt");
      __publicField(this, "numberValue");
      this.isInt = isInt;
      this.numberValue = numberValue;
    }
  };
  var Tokenizer = class {
    constructor(input, source = void 0) {
      __publicField(this, "input");
      __publicField(this, "source");
      __publicField(this, "pos");
      __publicField(this, "startPos");
      __publicField(this, "_currentChar", "\0");
      __publicField(this, "_peek2Str", "");
      __publicField(this, "_lastTokenIsSpace", false);
      __publicField(this, "tokens", []);
      __publicField(this, "keywordTable", {
        "if": TokenType.KW_IF,
        "else": TokenType.KW_ELSE,
        "then": TokenType.KW_THEN,
        "while": TokenType.KW_WHILE,
        "for": TokenType.KW_FOR,
        "function": TokenType.KW_FUNCTION,
        "break": TokenType.KW_BREAK,
        "continue": TokenType.KW_CONTINUE,
        "end": TokenType.KW_END,
        "return": TokenType.KW_RETURN,
        "super": TokenType.KW_SUPER,
        "true": TokenType.KW_TRUE,
        "false": TokenType.KW_FALSE,
        "null": TokenType.KW_NULL,
        "in": TokenType.KW_IN,
        "not": TokenType.OP_NOT,
        "or": TokenType.OP_OR,
        "and": TokenType.OP_AND,
        "isa": TokenType.OP_ISA,
        "new": TokenType.KW_NEW
      });
      this.input = input;
      this.pos = new Pos(0, 1, 1);
      this.startPos = this.pos.copy();
      this.source = source;
    }
    tokenize() {
      this.updateCharAndPeek();
      while (this.hasInput()) {
        this.processNextToken();
      }
      this.addEofToken(this.location());
      const tokensCombined = this.combinedTokens(this.tokens);
      return tokensCombined;
    }
    idx() {
      return this.pos.idx;
    }
    saveStartPos() {
      this.startPos = this.pos.copy();
    }
    location() {
      const endPos = this.pos.copy();
      const loc = new SrcLocation(this.startPos, endPos, this.source);
      return loc;
    }
    hasInput() {
      return this.idx() < this.input.length;
    }
    processNextToken() {
      const ch = this.getChar();
      if (this.isSpaceChar(ch)) {
        this.processSpaces();
      } else if (ch == "\n" || ch == "\r") {
        this.processNewline();
      } else if (ch == '"') {
        this.processStringLiteral();
      } else if (this.isNumericChar(ch)) {
        this.processNumberLiteral();
      } else if (ch == ";") {
        this.processCharToken(TokenType.SEMICOLON);
      } else if (ch == ":") {
        this.processCharToken(TokenType.COLON);
      } else if (ch == ".") {
        this.processDot();
      } else if (ch == ",") {
        this.processCharToken(TokenType.COMMA);
      } else if (ch == "(") {
        this.processCharToken(TokenType.OPEN_ROUND);
      } else if (ch == ")") {
        this.processCharToken(TokenType.CLOSE_ROUND);
      } else if (ch == "[") {
        this.processCharToken(TokenType.OPEN_SQUARE);
      } else if (ch == "]") {
        this.processCharToken(TokenType.CLOSE_SQUARE);
      } else if (ch == "{") {
        this.processCharToken(TokenType.OPEN_CURLY);
      } else if (ch == "}") {
        this.processCharToken(TokenType.CLOSE_CURLY);
      } else if (this.peek2Chars() == "//") {
        this.processComment();
      } else if (this.isOperatorChar(ch)) {
        this.processOperator();
      } else if (this.isIdentifierStartChar(ch)) {
        this.processSymbol();
      } else {
        throw new ParserError(`got Unknown(${ch}) where EOL is required`, this.pos);
      }
    }
    getChar() {
      return this._currentChar;
    }
    /**
     * Tries to peek N-amount of characters, cutting before if not possible
     * */
    peek2Chars() {
      return this._peek2Str;
    }
    advance(amount = 1) {
      let i = 0;
      while (i < amount) {
        this.pos.advance();
        i += 1;
      }
      if (this.hasInput()) {
        this.updateCharAndPeek();
      }
    }
    addToken(newToken) {
      this.tokens.push(newToken);
    }
    updateCharAndPeek() {
      this._currentChar = this.input[this.idx()];
      if (this.idx() + 1 < this.input.length) {
        const afterCurrent = this.input[this.idx() + 1];
        this._peek2Str = `${this._currentChar}${afterCurrent}`;
      } else {
        this._peek2Str = `${this._currentChar}`;
      }
    }
    processAfterSpaces() {
      const afterSpaces = this._lastTokenIsSpace;
      this._lastTokenIsSpace = false;
      return afterSpaces;
    }
    isSpaceChar(ch) {
      return ch == " " || ch == "	";
    }
    isIdentifierStartChar(ch) {
      return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch == "_" || // Support unicode
      ch > "\x9F";
    }
    isIdentifierChar(ch) {
      return ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || ch == "_" || // Support unicode
      ch > "\x9F";
    }
    isOperatorChar(ch) {
      return ch == "=" || ch == "!" || ch == "@" || ch == "^" || ch == "<" || ch == ">" || ch == "/" || ch == "*" || ch == "%" || ch == "+" || ch == "-";
    }
    isNumericChar(ch) {
      return ch >= "0" && ch <= "9";
    }
    processSpaces() {
      const spaces = this.consumeChars(this.isSpaceChar);
      if (spaces.length > 0) {
        this._lastTokenIsSpace = true;
      }
    }
    processNewline() {
      const peek2 = this.peek2Chars();
      const ch = this.getChar();
      if (peek2 == "\n\r" || peek2 == "\r\n") {
        this.advance(2);
      } else if (ch == "\n" || ch == "\r") {
        this.advance();
      } else {
        throw new ParserError("Expected newline character", this.pos);
      }
      this.addSimpleToken(TokenType.NEWLINE);
      this.pos.moveToNewLine();
    }
    processSymbol() {
      this.saveStartPos();
      const symbolValue = this.fetchSymbol();
      if (symbolValue in this.keywordTable) {
        const tokenType = this.keywordTable[symbolValue];
        this.addSimpleToken(tokenType);
      } else {
        this.addIdentifierToken(symbolValue);
      }
    }
    processOperator() {
      this.saveStartPos();
      const peek1 = this.getChar();
      const peek2 = this.peek2Chars();
      let charsToAdvance = 0;
      let tokenTypeToAdd = null;
      switch (peek2) {
        case "==":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.OP_EQUALS;
          break;
        case "!=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.OP_NOT_EQUALS;
          break;
        case "<=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.OP_LESS_EQUALS;
          break;
        case ">=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.OP_GREATER_EQUALS;
          break;
        case "+=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.PLUS_ASSIGN;
          break;
        case "-=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.MINUS_ASSIGN;
          break;
        case "*=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.MULT_ASSIGN;
          break;
        case "/=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.DIV_ASSIGN;
          break;
        case "%=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.MOD_ASSIGN;
          break;
        case "^=":
          charsToAdvance = 2;
          tokenTypeToAdd = TokenType.POW_ASSIGN;
          break;
      }
      if (tokenTypeToAdd === null) {
        switch (peek1) {
          case "=":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.ASSIGN;
            break;
          case "<":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_LESS;
            break;
          case ">":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_GREATER;
            break;
          case "+":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_PLUS;
            break;
          case "-":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_MINUS;
            break;
          case "*":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_MULT;
            break;
          case "/":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_DIV;
            break;
          case "%":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_MOD;
            break;
          case "^":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_POW;
            break;
          case "@":
            charsToAdvance = 1;
            tokenTypeToAdd = TokenType.OP_FUNCREF;
            break;
          default:
            throw new ParserError("Unhandled operator: " + peek1, this.startPos);
        }
      }
      if (tokenTypeToAdd != null) {
        this.addSimpleToken(tokenTypeToAdd);
        this.advance(charsToAdvance);
      }
    }
    processStringLiteral() {
      this.saveStartPos();
      const value = this.fetchStringLiteral();
      this.addStringLiteralToken(value, this.location());
    }
    fetchStringLiteral() {
      let chars = "";
      let closed = false;
      this.advance();
      while (this.hasInput() && !closed) {
        const peek2 = this.peek2Chars();
        const ch = this.getChar();
        if (peek2 == '""') {
          chars += '"';
          this.advance(2);
        } else if (ch == '"') {
          closed = true;
          this.advance();
        } else {
          chars += ch;
          this.advance();
        }
      }
      if (!closed) {
        throw new ParserError("Unterminated string literal", this.startPos);
      }
      return chars;
    }
    /**
     * Could be a dot for accessing a property, but could also be part of a float literal.
     *
     * It is part of a float literal if followed by a number
     * */
    processDot() {
      this.saveStartPos();
      const nextChars = this.peek2Chars();
      if (nextChars.length > 1 && this.isNumericChar(nextChars[1])) {
        this.processNumberLiteral();
      } else {
        this.processCharToken(TokenType.DOT);
      }
    }
    /**
     * Consume numeric chars until a dot or a non-numeric char is found.
     * If dot found, consume until non-numeric char is found.
     */
    processNumberLiteral() {
      this.saveStartPos();
      const value = this.fetchNumberLiteral();
      if (value.isInt) {
        this.addIntLiteralToken(value.numberValue, this.location());
      } else {
        this.addFloatLiteralToken(value.numberValue, this.location());
      }
    }
    fetchNumberLiteral() {
      let consumingFloatingPart = false;
      let intDigits = "";
      let floatDigits = "";
      let fetchingChars = true;
      let exponentPart = "";
      while (this.hasInput() && fetchingChars) {
        const ch = this.getChar();
        if (this.isNumericChar(ch)) {
          if (consumingFloatingPart) {
            floatDigits += ch;
            this.advance();
          } else {
            intDigits += ch;
            this.advance();
          }
        } else if (ch == ".") {
          if (consumingFloatingPart) {
            throw new ParserError("Unexpected repeated dot", this.startPos);
          }
          consumingFloatingPart = true;
          this.advance();
        } else if (ch == "e" || ch == "E") {
          exponentPart = this.parseExponentPart();
          fetchingChars = false;
        } else {
          fetchingChars = false;
        }
      }
      let numberValue;
      let isInt;
      if (floatDigits.length > 0) {
        numberValue = parseFloat(`${intDigits}.${floatDigits}${exponentPart}`);
        isInt = false;
      } else {
        numberValue = parseInt(`${intDigits}${exponentPart}`);
        isInt = true;
      }
      return new NumberLiteral(isInt, numberValue);
    }
    parseExponentPart() {
      const eChar = this.getChar();
      this.advance();
      const signChar = this.consumeAny("+", "-");
      if (!signChar) {
        throw new Error("Expected +/- after exponential letter");
      }
      let exponentPart = "";
      while (this.hasInput()) {
        const optDigit = this.consumeAny("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
        if (optDigit !== void 0) {
          exponentPart += optDigit;
        } else {
          break;
        }
      }
      if (exponentPart.length == 0) {
        throw new Error("Expected exponent in exponential notation");
      }
      return `${eChar}${signChar}${exponentPart}`;
    }
    /**
     * Advance until newline found
     */
    processComment() {
      let insideComment = true;
      while (this.hasInput() && insideComment) {
        const ch = this.getChar();
        const peek2 = this.peek2Chars();
        if (peek2 == "\n\r" || peek2 == "\r\n") {
          insideComment = false;
        } else if (ch == "\n" || ch == "\r") {
          insideComment = false;
        } else {
          this.advance();
        }
      }
    }
    consumeAny(...chars) {
      const c = this.getChar();
      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === c) {
          this.advance();
          return c;
        }
      }
      return void 0;
    }
    addSimpleToken(tokenType) {
      const afterSpace = this.processAfterSpaces();
      const newToken = new SimpleToken(
        tokenType,
        this.location(),
        afterSpace
      );
      this.addToken(newToken);
    }
    addIdentifierToken(identifierValue) {
      const afterSpace = this.processAfterSpaces();
      const newToken = new Identifier(
        identifierValue,
        this.location(),
        afterSpace
      );
      this.addToken(newToken);
    }
    addStringLiteralToken(stringValue, tokenLocation) {
      const afterSpace = this.processAfterSpaces();
      const newToken = new StringLiteral(
        stringValue,
        tokenLocation,
        afterSpace
      );
      this.addToken(newToken);
    }
    addIntLiteralToken(intValue, tokenLocation) {
      const afterSpace = this.processAfterSpaces();
      const newToken = new IntLiteral(
        intValue,
        tokenLocation,
        afterSpace
      );
      this.addToken(newToken);
    }
    addFloatLiteralToken(floatValue, tokenLocation) {
      const afterSpace = this.processAfterSpaces();
      const newToken = new FloatLiteral(
        floatValue,
        tokenLocation,
        afterSpace
      );
      this.addToken(newToken);
    }
    addEofToken(tokenLocation) {
      const afterSpace = this.processAfterSpaces();
      const newToken = new EofToken(
        tokenLocation,
        afterSpace
      );
      this.addToken(newToken);
    }
    fetchSymbol() {
      const predicate = (ch) => this.isIdentifierChar(ch);
      const value = this.consumeChars(predicate);
      return value;
    }
    /**
     * Consume chars as long as the predicate is true
     */
    consumeChars(predicate) {
      let chars = "";
      let fetchingChars = true;
      while (this.hasInput() && fetchingChars) {
        const ch = this.getChar();
        if (predicate(ch)) {
          chars += ch;
          this.advance();
        } else {
          fetchingChars = false;
        }
      }
      return chars;
    }
    processCharToken(tokenType) {
      this.saveStartPos();
      this.advance();
      this.addSimpleToken(tokenType);
    }
    combinedTokens(tokens) {
      let combinedTokens = [];
      let idx = 0;
      while (idx < tokens.length) {
        const token = tokens[idx];
        let optNextToken;
        if (idx + 1 < tokens.length) {
          optNextToken = tokens[idx + 1];
        } else {
          optNextToken = null;
        }
        let tokenToAdd = token;
        if (token.tokenType == TokenType.KW_END) {
          let secondTokenFound = false;
          if (optNextToken != null) {
            if (optNextToken.tokenType == TokenType.KW_IF) {
              const newLocation = token.location.upTo(optNextToken.location);
              tokenToAdd = new SimpleToken(TokenType.KW_END_IF, newLocation, token.afterSpace);
              secondTokenFound = true;
            } else if (optNextToken.tokenType == TokenType.KW_WHILE) {
              const newLocation = token.location.upTo(optNextToken.location);
              tokenToAdd = new SimpleToken(TokenType.KW_END_WHILE, newLocation, token.afterSpace);
              secondTokenFound = true;
            } else if (optNextToken.tokenType == TokenType.KW_FOR) {
              const newLocation = token.location.upTo(optNextToken.location);
              tokenToAdd = new SimpleToken(TokenType.KW_END_FOR, newLocation, token.afterSpace);
              secondTokenFound = true;
            } else if (optNextToken.tokenType == TokenType.KW_FUNCTION) {
              const newLocation = token.location.upTo(optNextToken.location);
              tokenToAdd = new SimpleToken(TokenType.KW_END_FUNCTION, newLocation, token.afterSpace);
              secondTokenFound = true;
            }
          }
          if (!secondTokenFound) {
            throw new ParserError("Expected token of type if / for / while / function after 'end", token.location.start);
          }
        } else if (token.tokenType == TokenType.KW_ELSE) {
          if (optNextToken != null && optNextToken instanceof SimpleToken) {
            if (optNextToken.tokenType == TokenType.KW_IF) {
              const newLocation = token.location.upTo(optNextToken.location);
              tokenToAdd = new SimpleToken(TokenType.KW_ELSE_IF, newLocation, token.afterSpace);
            }
          }
        }
        if (tokenToAdd != token) {
          idx += 2;
        } else {
          idx += 1;
        }
        combinedTokens.push(tokenToAdd);
      }
      return combinedTokens;
    }
  };
  var ParsingContext = class _ParsingContext {
    constructor(insideFunction = false, insideLoop = false, insideSingleLineThen = false, parsingStatementExpr = false) {
      this.insideFunction = insideFunction;
      this.insideLoop = insideLoop;
      this.insideSingleLineThen = insideSingleLineThen;
      this.parsingStatementExpr = parsingStatementExpr;
    }
    enterFunction() {
      const copy = this.copy();
      copy.insideFunction = true;
      return copy;
    }
    enterLoop() {
      const copy = this.copy();
      copy.insideLoop = true;
      return copy;
    }
    enterSingleLineThen() {
      const copy = this.copy();
      copy.insideSingleLineThen = true;
      return copy;
    }
    enterParsingStatementExpr() {
      const copy = this.copy();
      copy.parsingStatementExpr = true;
      return copy;
    }
    leaveParsingStatementExpr() {
      const copy = this.copy();
      copy.parsingStatementExpr = false;
      return copy;
    }
    copy() {
      return new _ParsingContext(
        this.insideFunction,
        this.insideLoop,
        this.insideSingleLineThen,
        this.parsingStatementExpr
      );
    }
  };
  var Parser = class {
    constructor(input) {
      __publicField(this, "defaultContext", new ParsingContext());
      __publicField(this, "current", 0);
      __publicField(this, "tokens", []);
      this.input = input;
    }
    parse() {
      this.tokens = this.tokenize(this.input);
      const statements = this.parseUntil([], this.defaultContext);
      return statements;
    }
    tokenize(input) {
      const tokenizer = new Tokenizer(input = input);
      const tokens = tokenizer.tokenize();
      const tokensWithSomeLineBreaksRemoved = this.removeSuperfluousLineBreaks(tokens);
      return tokensWithSomeLineBreaksRemoved;
    }
    /**
     * Some expressions make it possible to insert newlines and have them continue
     * in the next line.
     *
     * For example:
     *
     * [1, 2,
     *  3 ]
     *
     * Or:
     *
     * x ==
     * 3
     *
     * This function eliminates those newline tokens so that parsing
     * can proceed in a normal way, as if they were not there to begin with.
     * */
    //  - comma (in call expr / statement, in map / list)
    //  - open brackets (or all kinds)
    //  - colon (for slicing)
    //  - not
    //  - unary minus
    //  - new
    //  - @ (address of)
    //  - power ^
    //  - isa
    //  - dot (call)
    //  - logic operators
    //  - comparison operator
    //  - binary (algebr.) operators
    removeSuperfluousLineBreaks(tokens) {
      const typesThatAllowLineBreaks = [
        TokenType.COMMA,
        TokenType.OPEN_ROUND,
        TokenType.OPEN_SQUARE,
        TokenType.OPEN_CURLY,
        TokenType.COLON,
        TokenType.OP_NOT,
        TokenType.KW_NEW,
        TokenType.OP_FUNCREF,
        TokenType.OP_POW,
        TokenType.OP_ISA,
        TokenType.DOT,
        TokenType.OP_LESS,
        TokenType.OP_LESS_EQUALS,
        TokenType.OP_GREATER,
        TokenType.OP_GREATER_EQUALS,
        TokenType.OP_EQUALS,
        TokenType.OP_NOT_EQUALS,
        TokenType.OP_PLUS,
        TokenType.OP_MINUS,
        TokenType.OP_MULT,
        TokenType.OP_DIV,
        TokenType.OP_MOD,
        TokenType.OP_AND,
        TokenType.OP_OR,
        TokenType.ASSIGN,
        TokenType.PLUS_ASSIGN,
        TokenType.MINUS_ASSIGN,
        TokenType.MULT_ASSIGN,
        TokenType.DIV_ASSIGN,
        TokenType.MOD_ASSIGN,
        TokenType.POW_ASSIGN
      ];
      let cleanedUpTokens = [];
      let idx = 0;
      while (idx < tokens.length) {
        const token = tokens[idx];
        const tokenType = token.tokenType;
        if (typesThatAllowLineBreaks.includes(tokenType)) {
          cleanedUpTokens.push(token);
          idx += 1;
          let shouldConsume = true;
          while (shouldConsume && idx < tokens.length) {
            const maybeNewLine = tokens[idx];
            if (maybeNewLine.tokenType == TokenType.NEWLINE) {
              idx += 1;
            } else {
              shouldConsume = false;
            }
          }
        } else {
          cleanedUpTokens.push(token);
          idx += 1;
        }
      }
      return cleanedUpTokens;
    }
    parseUntil(stoppingTokenTypes, context) {
      let shouldContinue = true;
      let statements = [];
      while (!this.isAtEnd() && shouldContinue) {
        if (this.tokenMatch(TokenType.NEWLINE) || this.tokenMatch(TokenType.SEMICOLON))
          ;
        else {
          for (let stoppingTokenType of stoppingTokenTypes) {
            if (this.check(stoppingTokenType)) {
              shouldContinue = false;
            }
          }
          if (shouldContinue) {
            const s = this.statement(context);
            statements.push(s);
          }
        }
      }
      return statements;
    }
    statement(context) {
      if (this.tokenMatch(TokenType.KW_IF)) {
        return this.ifStatement(context);
      } else if (this.tokenMatch(TokenType.KW_WHILE)) {
        return this.whileStatement(context);
      } else if (this.tokenMatch(TokenType.KW_FOR)) {
        return this.forStatement(context);
      } else {
        return this.nonBlockStatement(context);
      }
    }
    /**
     * These statements can be appear as part of single-line statements
     * */
    nonBlockStatement(context) {
      if (this.tokenMatch(TokenType.KW_BREAK)) {
        return this.breakStatement(context);
      } else if (this.tokenMatch(TokenType.KW_CONTINUE)) {
        return this.continueStatement(context);
      } else if (this.tokenMatch(TokenType.KW_RETURN)) {
        return this.returnStatement(context);
      } else {
        const assignmentTokenTypes = [
          TokenType.ASSIGN,
          TokenType.PLUS_ASSIGN,
          TokenType.MINUS_ASSIGN,
          TokenType.MULT_ASSIGN,
          TokenType.DIV_ASSIGN,
          TokenType.MOD_ASSIGN,
          TokenType.POW_ASSIGN
        ];
        const optTokenType = this.findTokenWithinStatementBoundary(assignmentTokenTypes);
        if (optTokenType === TokenType.ASSIGN) {
          return this.assignmentStatement(context);
        } else if (optTokenType !== null) {
          return this.mathAssignmentStatement(optTokenType, context);
        } else {
          return this.expressionStatement(context);
        }
      }
    }
    ifStatement(context) {
      const condition = this.expression(context);
      this.consume(TokenType.KW_THEN, "Expected 'then' after condition. Found: " + this.peek());
      if (this.tokenMatch(TokenType.NEWLINE, TokenType.SEMICOLON)) {
        return this.multiLineIf(condition, context);
      } else {
        return this.singleLineIf(condition, context);
      }
    }
    multiLineIf(condition, context) {
      const ifStatements = this.parseUntil([TokenType.KW_ELSE_IF, TokenType.KW_ELSE, TokenType.KW_END_IF], context);
      const ifBranch = new ConditionedStatements(condition, ifStatements);
      let elseIfs = [];
      while (this.tokenMatch(TokenType.KW_ELSE_IF)) {
        let elseIfCondition = this.expression(context);
        this.consume(TokenType.KW_THEN, "Expected 'then' after condition in else-if");
        const elseIfStatements = this.parseUntil([TokenType.KW_ELSE_IF, TokenType.KW_ELSE, TokenType.KW_END_IF], context);
        const elseIf = new ConditionedStatements(elseIfCondition, elseIfStatements);
        elseIfs.push(elseIf);
      }
      let elseBranch;
      if (this.tokenMatch(TokenType.KW_ELSE)) {
        elseBranch = this.parseUntil([TokenType.KW_END_IF], context);
      } else {
        elseBranch = [];
      }
      this.consume(TokenType.KW_END_IF, "Expected 'end if' at the end of if block");
      return new IfStatement(ifBranch, elseIfs, elseBranch);
    }
    singleLineIf(condition, context) {
      const singleLineThenContext = context.enterSingleLineThen();
      const ifStatement = this.nonBlockStatement(singleLineThenContext);
      const ifBranch = new ConditionedStatements(condition, [ifStatement]);
      let elseBranch;
      if (this.tokenMatch(TokenType.KW_ELSE)) {
        const statement = this.nonBlockStatement(context);
        elseBranch = [statement];
      } else {
        elseBranch = [];
      }
      return new IfStatement(ifBranch, [], elseBranch);
    }
    whileStatement(context) {
      const whileToken = this.previous();
      const condition = this.expression(context);
      this.consumeAtLeastOne([TokenType.SEMICOLON, TokenType.NEWLINE], "Expected semicolon or newline after while-condition");
      const loopContext = context.enterLoop();
      const whileStatements = this.parseUntil([TokenType.KW_END_WHILE], loopContext);
      this.consume(TokenType.KW_END_WHILE, "'while' without matching 'end while'");
      const headerLocation = whileToken.location.upTo(condition.location());
      return new WhileStatement(condition, headerLocation, whileStatements);
    }
    forStatement(context) {
      const forToken = this.previous();
      const loopVar = this.consume(TokenType.IDENTIFIER_TK, "Expected identifier as loop variable");
      this.consume(TokenType.KW_IN, "Expected 'in' after loop-variable in for");
      const rangeExpression = this.expression(context);
      this.consumeAtLeastOne([TokenType.SEMICOLON, TokenType.NEWLINE], "Expected semicolon or newline after for-header");
      const loopContext = context.enterLoop();
      const forStatements = this.parseUntil([TokenType.KW_END_FOR], loopContext);
      this.consume(TokenType.KW_END_FOR, "'for' without matching 'end for'");
      const headerLocation = forToken.location.upTo(rangeExpression.location());
      return new ForStatement(loopVar, rangeExpression, headerLocation, forStatements);
    }
    breakStatement(context) {
      if (context.insideLoop) {
        const fullLocation = this.previous().location;
        return new BreakStatement(fullLocation);
      } else {
        throw this.failParsing("Keyword 'break' only allowed in for / while loops");
      }
    }
    continueStatement(context) {
      if (context.insideLoop) {
        const fullLocation = this.previous().location;
        return new ContinueStatement(fullLocation);
      } else {
        throw this.failParsing("Keyword 'continue' only allowed in for / while loops");
      }
    }
    returnStatement(context) {
      const openingToken = this.previous();
      let fullLocation;
      let optReturnValue;
      if (this.isAtEndOfStatement(context)) {
        optReturnValue = void 0;
        fullLocation = openingToken.location;
      } else {
        optReturnValue = this.functionBodyOrExpr(context);
        fullLocation = openingToken.location.upTo(optReturnValue.location());
      }
      return new ReturnStatement(optReturnValue, fullLocation);
    }
    expressionStatement(context) {
      const statementExprContext = context.enterParsingStatementExpr();
      const expr = this.expression(statementExprContext);
      if (!this.isAtEndOfStatement(context)) {
        let args = [];
        do {
          const argumentExp = this.functionBodyOrExpr(context);
          args.push(argumentExp);
        } while (this.tokenMatch(TokenType.COMMA));
        return new FunctionCallStatement(expr, args);
      } else {
        return new ExpressionStatement(expr);
      }
    }
    isAtEndOfStatement(context) {
      const nextTokenType = this.peek().tokenType;
      if (context.insideSingleLineThen) {
        return [TokenType.KW_ELSE, TokenType.SEMICOLON, TokenType.NEWLINE, TokenType.EOF].includes(nextTokenType);
      } else {
        return [TokenType.SEMICOLON, TokenType.NEWLINE, TokenType.EOF].includes(nextTokenType);
      }
    }
    assignmentStatement(context) {
      if (this.check(TokenType.OP_FUNCREF)) {
        this.advance();
      }
      const target = this.call(context);
      this.consume(TokenType.ASSIGN, "Expected '=' in assignment");
      const value = this.functionBodyOrExpr(context);
      if (target instanceof IdentifierExpr || target instanceof DotAccessExpr || target instanceof IndexedAccessExpr) {
        return new AssignmentStatement(target, value);
      } else {
        throw this.failParsing("Invalid assignment target");
      }
    }
    mathAssignmentStatement(tokenType, context) {
      const target = this.call(context);
      const tokenStr = this.mathAssignmentString(tokenType);
      this.consume(tokenType, `Expected '${tokenStr}' in math-assignment`);
      const value = this.functionBodyOrExpr(context);
      if (target instanceof IdentifierExpr || target instanceof DotAccessExpr || target instanceof IndexedAccessExpr) {
        return new MathAssignmentStatement(target, tokenType, value);
      } else {
        throw this.failParsing("Invalid math-assignment target");
      }
    }
    mathAssignmentString(tokenType) {
      switch (tokenType) {
        case TokenType.PLUS_ASSIGN:
          return "+=";
        case TokenType.MINUS_ASSIGN:
          return "+=";
        case TokenType.MULT_ASSIGN:
          return "+=";
        case TokenType.DIV_ASSIGN:
          return "+=";
        case TokenType.MOD_ASSIGN:
          return "+=";
        case TokenType.POW_ASSIGN:
          return "+=";
        default:
          throw this.failParsing("Unexpected math-assignment token type: " + TokenType[tokenType]);
      }
    }
    expression(context) {
      return this.logicOr(context);
    }
    logicOr(context) {
      let expr = this.logicAnd(context);
      while (this.tokenMatch(TokenType.OP_OR)) {
        const operator = this.previous();
        const right = this.logicAnd(context);
        expr = new LogicExpr(expr, operator, right);
      }
      return expr;
    }
    logicAnd(context) {
      let expr = this.unaryNot(context);
      while (this.tokenMatch(TokenType.OP_AND)) {
        const operator = this.previous();
        const right = this.unaryNot(context);
        expr = new LogicExpr(expr, operator, right);
      }
      return expr;
    }
    unaryNot(context) {
      if (this.tokenMatch(TokenType.OP_NOT)) {
        const operator = this.previous();
        const right = this.isaComparison(context);
        return new UnaryExpr(operator, right);
      } else {
        return this.isaComparison(context);
      }
    }
    isaComparison(context) {
      let expr = this.chainedComparison(context);
      while (this.tokenMatch(TokenType.OP_ISA)) {
        const operator = this.previous();
        const right = this.term(context);
        expr = new BinaryExpr(expr, operator, right);
      }
      return expr;
    }
    chainedComparison(context) {
      const expr = this.term(context);
      const operands = [expr];
      const operators = [];
      while (this.tokenMatch(
        TokenType.OP_NOT_EQUALS,
        TokenType.OP_EQUALS,
        TokenType.OP_GREATER,
        TokenType.OP_GREATER_EQUALS,
        TokenType.OP_LESS,
        TokenType.OP_LESS_EQUALS
      )) {
        const operator = this.previous();
        const right = this.term(context);
        operators.push(operator);
        operands.push(right);
      }
      if (operators.length == 0) {
        return expr;
      } else if (operators.length == 1) {
        return new BinaryExpr(operands[0], operators[0], operands[1]);
      } else {
        return new ChainedComparisonExpr(operands, operators);
      }
    }
    term(context) {
      let expr = this.factor(context);
      if (!this.isFollowedByUnaryMinus(context)) {
        while (this.tokenMatch(TokenType.OP_MINUS, TokenType.OP_PLUS)) {
          const operator = this.previous();
          const right = this.factor(context);
          expr = new BinaryExpr(expr, operator, right);
        }
      }
      return expr;
    }
    /**
     * Checks if the expression is followed by an unary-minus
     *
     * If at the beginning of statement and expr is a property access or identifier
     * AND next token is OP_MINUS w/afterSpace AND whatever comes after OP_MINUS is not afterSpace,
     * then bypass this: don't try to match term
     */
    isFollowedByUnaryMinus(context) {
      let followedByMinus = this.peek().tokenType == TokenType.OP_MINUS;
      if (context.parsingStatementExpr && followedByMinus) {
        const hasSpaceBeforeMinus = this.peek().afterSpace;
        const peekOne = this.peekAmount(1);
        const hasSpaceAfterMinus = peekOne != null && peekOne.afterSpace;
        return hasSpaceBeforeMinus && !hasSpaceAfterMinus;
      } else {
        return false;
      }
    }
    factor(context) {
      let expr = this.power(context);
      while (this.tokenMatch(TokenType.OP_DIV, TokenType.OP_MULT, TokenType.OP_MOD)) {
        const operator = this.previous();
        const right = this.power(context);
        expr = new BinaryExpr(expr, operator, right);
      }
      return expr;
    }
    power(context) {
      let expr = this.unary(context);
      while (this.tokenMatch(TokenType.OP_POW)) {
        const operator = this.previous();
        const right = this.unary(context);
        expr = new BinaryExpr(expr, operator, right);
      }
      return expr;
    }
    unary(context) {
      if (this.tokenMatch(TokenType.OP_MINUS, TokenType.KW_NEW)) {
        const operator = this.previous();
        const right = this.call(context);
        if (right instanceof Literal && typeof right.value == "number" && operator.tokenType == TokenType.OP_MINUS) {
          const fullLocation = operator.location.upTo(right.location());
          return new Literal(-right.value, fullLocation);
        } else {
          return new UnaryExpr(operator, right);
        }
      } else if (this.tokenMatch(TokenType.OP_FUNCREF)) {
        return this.functionReference(context);
      } else {
        return this.call(context);
      }
    }
    functionReference(context) {
      const openingToken = this.previous();
      const refTarget = this.call(context);
      if (refTarget instanceof IdentifierExpr || refTarget instanceof DotAccessExpr || refTarget instanceof IndexedAccessExpr) {
        const fullLocation = openingToken.location.upTo(refTarget.location());
        return new FunctionRefExpr(refTarget, fullLocation);
      } else {
        throw new ParserError("Invalid reference target for '@'", refTarget.location().start);
      }
    }
    call(context) {
      let expr = this.primary(context);
      let continueParsing = true;
      while (continueParsing) {
        if (context.parsingStatementExpr && this.matchesNonAfterSpaces(TokenType.OPEN_ROUND)) {
          const nonStatementExprContext = context.leaveParsingStatementExpr();
          expr = this.finishCall(expr, nonStatementExprContext);
        } else if (!context.parsingStatementExpr && this.tokenMatch(TokenType.OPEN_ROUND)) {
          expr = this.finishCall(expr, context);
        } else if (this.matchesNonAfterSpaces(TokenType.OPEN_SQUARE)) {
          expr = this.indexedAccessOrSlicing(expr, context);
        } else if (this.matchesNonAfterSpaces(TokenType.DOT)) {
          const propertyName = this.consume(
            TokenType.IDENTIFIER_TK,
            "Expected property name after '.'"
          );
          expr = new DotAccessExpr(expr, propertyName);
          if (this.peek().afterSpace) {
            continueParsing = false;
          }
        } else {
          continueParsing = false;
        }
      }
      return expr;
    }
    finishCall(callTarget, context) {
      let args = [];
      if (!this.check(TokenType.CLOSE_ROUND)) {
        do {
          const argumentExpression = this.functionBodyOrExpr(context);
          args.push(argumentExpression);
        } while (this.tokenMatch(TokenType.COMMA));
      }
      this.consume(TokenType.CLOSE_ROUND, "Expected closing ')' after function arguments");
      const closingToken = this.previous();
      const fullLocation = callTarget.location().upTo(closingToken.location);
      return new FunctionCallExpr(callTarget, args, fullLocation);
    }
    functionBodyOrExpr(context) {
      if (this.tokenMatch(TokenType.KW_FUNCTION)) {
        return this.functionBody(context);
      } else {
        return this.expression(context);
      }
    }
    indexedAccessOrSlicing(targetObj, context) {
      const openingToken = this.previous();
      let slicing = false;
      let startExpr = void 0;
      let stopExpr = void 0;
      let indexExpr = void 0;
      if (this.tokenMatch(TokenType.COLON)) {
        slicing = true;
        if (!this.check(TokenType.CLOSE_SQUARE)) {
          stopExpr = this.expression(context);
        }
      } else {
        const expr = this.expression(context);
        if (this.tokenMatch(TokenType.COLON)) {
          slicing = true;
          startExpr = expr;
          if (!this.check(TokenType.CLOSE_SQUARE)) {
            stopExpr = this.expression(context);
          }
        } else {
          indexExpr = expr;
        }
      }
      this.consume(TokenType.CLOSE_SQUARE, "Expected closing ']' for indexed access. Found: " + this.peek().tokenType);
      const closingToken = this.previous();
      const fullRange = SrcLocation.forTokenRange(openingToken, closingToken);
      if (slicing) {
        return new ListSlicingExpr(targetObj, startExpr, stopExpr, fullRange);
      } else {
        return new IndexedAccessExpr(targetObj, indexExpr, fullRange);
      }
    }
    primary(context) {
      if (this.tokenMatch(TokenType.KW_FALSE)) {
        return new Literal(0, this.previous().location);
      } else if (this.tokenMatch(TokenType.KW_TRUE)) {
        return new Literal(1, this.previous().location);
      } else if (this.tokenMatch(TokenType.KW_NULL)) {
        return new Literal(null, this.previous().location);
      } else if (this.tokenMatch(TokenType.KW_SUPER)) {
        return this.superExpr(context);
      } else if (this.tokenMatch(TokenType.INT_LITERAL, TokenType.FLOAT_LITERAL, TokenType.STRING_LITERAL)) {
        const token = this.previous();
        return new Literal(token.value, token.location);
      } else if (this.check(TokenType.IDENTIFIER_TK)) {
        return this.identifier();
      } else if (this.tokenMatch(TokenType.OPEN_ROUND)) {
        return this.groupingExpr(context);
      } else if (this.tokenMatch(TokenType.OPEN_SQUARE)) {
        return this.listLiteral(context);
      } else if (this.tokenMatch(TokenType.OPEN_CURLY)) {
        return this.mapLiteral(context);
      } else {
        throw this.failForMissingExpression();
      }
    }
    failForMissingExpression() {
      const found = this.peek().tokenType;
      let msg = "";
      if (found === TokenType.KW_END_IF) {
        msg = "'end if' without matching 'if'";
      } else if (found === TokenType.KW_END_FOR) {
        msg = "'end for' without matching 'for'";
      } else if (found === TokenType.KW_END_WHILE) {
        msg = "'end while' without matching 'while'";
      } else if (found === TokenType.KW_END_FUNCTION) {
        msg = "'end function' without matching 'function'";
      } else if (found === TokenType.KW_FUNCTION) {
        msg = "unexpected keyword 'function' at start of line";
      } else {
        msg = "Expected expression. Found: " + TokenType[found];
      }
      return this.failParsing(msg);
    }
    groupingExpr(context) {
      const openingToken = this.previous();
      const expr = this.expression(context);
      this.consume(TokenType.CLOSE_ROUND);
      const closingToken = this.previous();
      const fullLocation = SrcLocation.forTokenRange(openingToken, closingToken);
      return new GroupingExpr(expr, fullLocation);
    }
    identifier() {
      const token = this.consume(TokenType.IDENTIFIER_TK, "Identifier expected");
      return new IdentifierExpr(token);
    }
    superExpr(context) {
      if (context.insideFunction) {
        const token = this.previous();
        return new SuperExpr(token.location);
      } else {
        throw this.failParsing("Keyword 'super' only allowed inside a function");
      }
    }
    listLiteral(context) {
      const openingToken = this.previous();
      let elements = [];
      if (!this.check(TokenType.CLOSE_SQUARE)) {
        let continueParsing = true;
        do {
          if (this.previous().tokenType == TokenType.COMMA && this.check(TokenType.CLOSE_SQUARE)) {
            continueParsing = false;
          } else {
            const argumentExpression = this.expression(context);
            elements.push(argumentExpression);
          }
        } while (this.tokenMatch(TokenType.COMMA) && continueParsing);
      }
      this.consume(TokenType.CLOSE_SQUARE, "Expected closing ']' in list literal");
      const closingToken = this.previous();
      const fullLocation = SrcLocation.forTokenRange(openingToken, closingToken);
      return new ListExpr(elements, fullLocation);
    }
    mapLiteral(context) {
      const openingToken = this.previous();
      let elements = /* @__PURE__ */ new Map();
      if (!this.check(TokenType.CLOSE_CURLY)) {
        let continueParsing = true;
        do {
          if (this.previous().tokenType == TokenType.COMMA && this.check(TokenType.CLOSE_CURLY)) {
            continueParsing = false;
          } else {
            const key = this.expression(context);
            this.consume(TokenType.COLON, "Expected ':' after key. Found: " + this.peek().tokenType);
            const value = this.expression(context);
            elements.set(key, value);
          }
        } while (this.tokenMatch(TokenType.COMMA) && continueParsing);
      }
      this.consume(TokenType.CLOSE_CURLY, "Expected closing '}' in map literal");
      const closingToken = this.previous();
      const fullLocation = SrcLocation.forTokenRange(openingToken, closingToken);
      return new MapExpr(elements, fullLocation);
    }
    functionBody(context) {
      const openingToken = this.previous();
      const functionContext = context.enterFunction();
      let args = [];
      if (this.tokenMatch(TokenType.OPEN_ROUND)) {
        do {
          if (this.check(TokenType.IDENTIFIER_TK)) {
            const identifierExpr = this.identifier();
            const name = identifierExpr.identifier.value;
            let fullLocation2;
            let defaultValue;
            if (this.tokenMatch(TokenType.ASSIGN)) {
              const defaultValueExpr = this.unary(context);
              defaultValue = this.ensureLiteral(defaultValueExpr);
              fullLocation2 = identifierExpr.location().upTo(defaultValue.location());
            } else {
              defaultValue = void 0;
              fullLocation2 = identifierExpr.location();
            }
            const argument = new Argument(name, defaultValue, fullLocation2);
            args.push(argument);
          }
        } while (this.tokenMatch(TokenType.COMMA));
        this.consume(TokenType.CLOSE_ROUND, "Expected closing ')' after argument list");
      }
      const bodyStatements = this.parseUntil([TokenType.KW_END_FUNCTION], functionContext);
      this.consume(TokenType.KW_END_FUNCTION, "Expected 'end function' at the end of function-body");
      const closingToken = this.previous();
      const fullLocation = SrcLocation.forTokenRange(openingToken, closingToken);
      return new FunctionBodyExpr(args, bodyStatements, fullLocation);
    }
    ensureLiteral(expr) {
      if (expr instanceof Literal) {
        return expr;
      } else {
        throw this.failParsing("Default value should be literal");
      }
    }
    consume(tokenType, message = null) {
      if (this.check(tokenType)) {
        return this.advance();
      } else if (message != null) {
        throw this.failParsing(message);
      } else {
        const tokenFound = this.peek();
        const msg = `got ${toOfficialImplTokenName(tokenFound.tokenType)} where ${toOfficialImplTokenName(tokenType)} is required`;
        throw this.failParsing(msg);
      }
    }
    /**
     * Tries to consume as many of the token-types as possible, at least one
     * */
    consumeAtLeastOne(tokenTypes, message) {
      let shouldConsume = true;
      let tokensConsumed = 0;
      while (!this.isAtEnd() && shouldConsume) {
        let matchFound = false;
        for (let tokenType of tokenTypes) {
          if (this.check(tokenType)) {
            matchFound = true;
            tokensConsumed += 1;
            this.advance();
          }
        }
        if (!matchFound) {
          shouldConsume = false;
        }
      }
      if (tokensConsumed == 0) {
        const pos = this.peek().location.start;
        throw new ParserError(message, pos);
      }
    }
    failParsing(message) {
      let pos = this.peek().location.start;
      if (this.peek().tokenType === TokenType.EOF && pos.col !== 0) {
        pos = pos.copy();
        pos.moveToNewLine();
      }
      return new ParserError(message, pos);
    }
    tokenMatch(...types) {
      for (let tokenType of types) {
        if (this.check(tokenType)) {
          this.advance();
          return true;
        }
      }
      return false;
    }
    matchesNonAfterSpaces(tokenType) {
      const token = this.peek();
      if (token.tokenType == tokenType && !token.afterSpace) {
        this.advance();
        return true;
      } else {
        return false;
      }
    }
    /**
     * Checks tokens until the next newline / semicolon / EOF.
     * That is: within a statement boundary
     *
     * Useful for "guessing" statements
     * */
    findTokenWithinStatementBoundary(tokenTypes) {
      let idx = this.current;
      while (true) {
        const token = this.tokens[idx];
        if ([TokenType.EOF, TokenType.SEMICOLON, TokenType.NEWLINE].includes(token.tokenType)) {
          return null;
        } else if (tokenTypes.includes(token.tokenType)) {
          return token.tokenType;
        }
        idx += 1;
      }
    }
    check(tokenType) {
      if (this.current > this.tokens.length) {
        return false;
      } else {
        return this.peek().tokenType == tokenType;
      }
    }
    advance() {
      if (!this.isAtEnd()) {
        this.current += 1;
      }
      return this.previous();
    }
    isAtEnd() {
      return this.peek().tokenType == TokenType.EOF;
    }
    peek() {
      return this.tokens[this.current];
    }
    peekAmount(amount) {
      const idx = this.current + amount;
      if (idx < this.tokens.length) {
        return this.tokens[idx];
      } else {
        return null;
      }
    }
    previous() {
      return this.tokens[this.current - 1];
    }
  };
  var Runtime = class {
    constructor(vm) {
      this.vm = vm;
    }
    newMap() {
      return new MSMap(this.vm);
    }
    get globals() {
      return this.vm.globalContext;
    }
    addIntrinsic(signature, impl) {
      this.vm.addIntrinsic(signature, impl);
    }
    addMapIntrinsic(target, signature, impl) {
      this.vm.addMapIntrinsic(target, signature, impl);
    }
  };
  var CooperativeRunner = class {
    constructor(vm, code) {
      this.vm = vm;
      this.code = code;
      this.vm.prepareForRunning(code);
      this.vm.setRunAfterSuspended(false);
    }
    runSomeCycles() {
      if (!this.isFinished()) {
        this.vm.runSomeCycles();
      }
    }
    stop() {
      this.vm.stopRunning();
    }
    getCurrentSourceLocation() {
      const fileName = this.vm.getCurrentSrcFileName();
      const lineNr = this.vm.getCurrentSrcLineNr();
      return [fileName, lineNr];
    }
    isFinished() {
      const result = this.vm.isFinished();
      return result;
    }
    get compiledCode() {
      return this.code;
    }
    getLastValue() {
      return this.vm.lastValue;
    }
  };
  var StdRunner = class {
    constructor(vm, code) {
      this.vm = vm;
      this.code = code;
      this.vm.prepareForRunning(code);
    }
    async runUntilDone() {
      const vm = this.vm;
      return new Promise((resolve) => {
        vm.onFinished = () => {
          resolve(true);
        };
        vm.run();
      });
    }
    stop() {
      this.vm.stopRunning();
    }
    getCurrentSourceLocation() {
      const fileName = this.vm.getCurrentSrcFileName();
      const lineNr = this.vm.getCurrentSrcLineNr();
      return [fileName, lineNr];
    }
    isFinished() {
      const result = this.vm.isFinished();
      return result;
    }
    get compiledCode() {
      return this.code;
    }
  };
  var Interpreter = class {
    constructor(stdoutCallback = null, stderrCallback = null) {
      __publicField(this, "stderrCallback");
      __publicField(this, "vm");
      __publicField(this, "_runtime");
      if (!stdoutCallback) {
        stdoutCallback = (line) => {
          console.log(line);
        };
      }
      if (!stderrCallback) {
        stderrCallback = stdoutCallback;
      }
      this.stderrCallback = stderrCallback;
      this.vm = new Processor(stdoutCallback, stderrCallback);
      this._runtime = new Runtime(this.vm);
      addStandardIntrinsics(this.vm);
    }
    async runSrcCode(srcCode, srcName) {
      const code = this.compileSrcCode(srcCode, srcName);
      if (code) {
        const runner = new StdRunner(this.vm, code);
        const result = await runner.runUntilDone();
        return result;
      } else {
        return false;
      }
    }
    getStandardRunner(srcCode, srcName) {
      const code = this.compileSrcCode(srcCode, srcName);
      if (code) {
        const runner = new StdRunner(this.vm, code);
        return runner;
      } else {
        return null;
      }
    }
    getCooperativeRunner(srcCode, srcName) {
      const code = this.compileSrcCode(srcCode, srcName);
      if (code) {
        const runner = new CooperativeRunner(this.vm, code);
        return runner;
      } else {
        return null;
      }
    }
    get runtime() {
      return this._runtime;
    }
    debugSrcCode(srcCode, callbacks, srcName) {
      const code = this.compileSrcCode(srcCode, srcName);
      if (code) {
        const d = this.debugCompiledCode(code, callbacks);
        return d;
      } else {
        return null;
      }
    }
    // Return a promise that is resolved only when the module code
    // is done running.
    runSrcAsModule(moduleName, srcCode) {
      const invocationCode = this.compileModuleInvocation(moduleName, srcCode);
      const vm = this.vm;
      const promise = vm.runAtCurrentPosition(invocationCode);
      return promise;
    }
    stopExecution() {
      this.vm.stopRunning();
    }
    compileSrcCode(srcCode, srcName) {
      let parsedStatements = [];
      try {
        const p = new Parser(srcCode);
        parsedStatements = p.parse();
      } catch (e) {
        if (e["message"]) {
          console.error(e);
          this.stderrCallback(e.message);
        }
      }
      if (parsedStatements.length > 0) {
        const compiler = new Compiler(parsedStatements, srcName);
        const code = compiler.compile();
        return code;
      } else {
        return null;
      }
    }
    debugCompiledCode(prgCode, callbacks) {
      const vm = this.vm;
      const dbg = new Debugger(vm);
      dbg.onSrcChange = () => {
        callbacks.onSrcChange(dbg);
      };
      dbg.onFinished = () => {
        callbacks.onFinished(dbg);
      };
      vm.prepareForRunning(prgCode);
      dbg.start();
      return dbg;
    }
    compileModuleInvocation(moduleName, srcCode) {
      const p = new Parser(srcCode);
      const parsedStatements = p.parse();
      const compiler = new Compiler(parsedStatements, `${moduleName}.ms`);
      const code = compiler.compileModuleInvocation(moduleName);
      return code;
    }
  };

  // src/msTerminal.ts
  var MSTerminal = class {
    interp;
    jqTerm;
    constructor() {
      const outCallback = (txt) => {
        console.log(txt);
      };
      this.jqTerm = void 0;
      this.interp = new Interpreter(outCallback, outCallback);
      this.setupIntrinsics();
    }
    setup() {
      const outerThis = this;
      const options = {
        onInit: (terminal) => {
          outerThis.onInit(terminal);
        },
        onAfterCommand: (command) => {
          outerThis.onAfterCommand(command);
        },
        name: "ms_terminal",
        height: 200,
        width: 450,
        prompt: "] ",
        greetings: ""
      };
      const jq = $("#term_demo");
      const jqTerm = jq.terminal((command) => {
        outerThis.onCommand(command);
      }, options);
      this.jqTerm = jqTerm;
      jqTerm.pause();
    }
    setupIntrinsics() {
      const runtime = this.interp.runtime;
      const outerThis = this;
      runtime.addIntrinsic(
        "print(txt,delim=null)",
        function(txt, delim) {
          outerThis.print(txt, delim);
        }
      );
      runtime.addIntrinsic(
        "input(prompt=null)",
        function(prompt) {
          return outerThis.input(prompt);
        }
      );
    }
    print(txt, delim) {
      this.jqTerm.echo(txt);
    }
    async input(prompt) {
      this.jqTerm.resume();
      if (prompt === null) {
        prompt = "";
      }
      return this.jqTerm.read(prompt).then((txt) => {
        this.jqTerm.pause();
        return txt;
      });
    }
    run(srcCode, fileName) {
      const coopRunner = this.interp.getCooperativeRunner(srcCode, fileName);
      if (coopRunner) {
        this.runCycles(coopRunner);
      }
    }
    runCycles(coopRunner) {
      if (!coopRunner.isFinished()) {
        coopRunner.runSomeCycles();
        setTimeout(() => {
          this.runCycles(coopRunner);
        }, 0);
      } else {
        console.log("Finished");
      }
    }
    onInit(term) {
    }
    onCommand(cmd) {
    }
    onAfterCommand(cmd) {
    }
  };

  // src/index.ts
  jQuery(($2, _) => {
    const msTerm = new MSTerminal();
    msTerm.setup();
    const mainFile = "demo.ms";
    fetch(mainFile).then((response) => {
      return response.text();
    }).then((srcCode) => {
      msTerm.run(srcCode, mainFile);
    });
  });
})();
//# sourceMappingURL=miniscript-web-term.js.map
