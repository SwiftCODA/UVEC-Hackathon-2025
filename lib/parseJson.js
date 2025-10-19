"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeGenerator = void 0;
var nunjucks_1 = require("nunjucks");
var zod_1 = require("zod");
// Zod schemas for validation
var ExperienceSchema = zod_1.z.object({
    job_title: zod_1.z.string(),
    company_name: zod_1.z.string(),
    location: zod_1.z.string(),
    start_date: zod_1.z.string(),
    end_date: zod_1.z.string().optional(),
    accomplishments: zod_1.z.array(zod_1.z.string())
});
var EducationSchema = zod_1.z.object({
    degree: zod_1.z.string(),
    institution: zod_1.z.string(),
    location: zod_1.z.string(),
    graduation_date: zod_1.z.string(),
    gpa: zod_1.z.string().optional()
});
var ResumeDataSchema = zod_1.z.object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    city: zod_1.z.string(),
    state_province_abbreviation: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone_number: zod_1.z.string().optional(),
    github_url: zod_1.z.string().url().optional(),
    linkedin_url: zod_1.z.string().url().optional(),
    education: zod_1.z.array(EducationSchema),
    experience: zod_1.z.array(ExperienceSchema)
});
// Configure Nunjucks environment with custom filters
var env = new nunjucks_1.default.Environment(null, { autoescape: false });
// LaTeX escape filter
env.addFilter('latex', function (str) {
    if (!str)
        return '';
    return str
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/[&%$#_{}]/g, '\\$&')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}');
});
// Date formatting filter
env.addFilter('formatDate', function (dateStr) {
    if (!dateStr)
        return 'Present';
    var date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
});
// LaTeX resume template
var RESUME_TEMPLATE = "\n\\documentclass[letterpaper,11pt]{article}\n\\usepackage[margin=0.75in]{geometry}\n\\usepackage{enumitem}\n\\usepackage{hyperref}\n\n\\setlength{\\parindent}{0pt}\n\\pagestyle{empty}\n\n\\begin{document}\n\n\\begin{center}\n{\\Large \\textbf{ {{ first_name | latex }} {{ last_name | latex }} }}\\\\[0.2cm]\n{{ city | latex }}, {{ state_province_abbreviation | latex }} \\quad\n{{ email | latex }}\n{% if phone_number %} \\quad {{ phone_number | latex }}{% endif %}\n{% if github_url %} \\quad \\href{ {{ github_url }} }{GitHub}{% endif %}\n{% if linkedin_url %} \\quad \\href{ {{ linkedin_url }} }{LinkedIn}{% endif %}\n\\end{center}\n\n{% if education.length > 0 %}\n\\section*{Education}\n\\hrule\n\\vspace{0.2cm}\n{% for edu in education %}\n\\textbf{ {{ edu.degree | latex }} } \\hfill {{ edu.graduation_date | formatDate }}\\\\\n{{ edu.institution | latex }}, {{ edu.location | latex }}\n{% if edu.gpa %} \\hfill GPA: {{ edu.gpa | latex }}{% endif %}\n\\vspace{0.2cm}\n{% endfor %}\n{% endif %}\n\n{% if experience.length > 0 %}\n\\section*{Experience}\n\\hrule\n\\vspace{0.2cm}\n{% for exp in experience %}\n\\textbf{ {{ exp.job_title | latex }} } \\hfill {{ exp.start_date | formatDate }} -- {{ exp.end_date | formatDate }}\\\\\n{{ exp.company_name | latex }}, {{ exp.location | latex }}\n\\begin{itemize}[leftmargin=*, noitemsep, topsep=0pt]\n{% for acc in exp.accomplishments %}\n\\item {{ acc | latex }}\n{% endfor %}\n\\end{itemize}\n\\vspace{0.2cm}\n{% endfor %}\n{% endif %}\n\n\\end{document}\n".trim();
var ResumeGenerator = /** @class */ (function () {
    function ResumeGenerator(jsonData) {
        // Automatically validates with Zod
        this.data = ResumeDataSchema.parse(jsonData);
    }
    // Generate LaTeX from template
    ResumeGenerator.prototype.generateLaTeX = function () {
        return env.renderString(RESUME_TEMPLATE, this.data);
    };
    // Save to .tex file (optional)
    ResumeGenerator.prototype.saveToFile = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var latex, fs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        latex = this.generateLaTeX();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require('fs/promises'); })];
                    case 1:
                        fs = _a.sent();
                        return [4 /*yield*/, fs.writeFile(filepath, latex, 'utf-8')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Fetch JSON from API (optional)
    ResumeGenerator.fetchResumeData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, new ResumeGenerator(json)];
                }
            });
        });
    };
    return ResumeGenerator;
}());
exports.ResumeGenerator = ResumeGenerator;
