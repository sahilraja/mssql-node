import { SurveyModel } from "./survey-model";
import { Op } from "sequelize";
import { APIError } from "../utils/custom_error";

export async function readSurvey(id: any) {
    return await SurveyModel.findByPk(id);
}

export async function listSurveys(query: any, token: any) {
    let offset = 0;
    const activeCheck = query.is_active ? { where: { is_active: true } } : {};
    const data = await SurveyModel.findAndCountAll(activeCheck);
    const limit = query.limit || data.count;
    const page = query.page || 1;
    const pages = Math.ceil(data.count / limit);
    const sort = query.sort || "createdAt";
    const sortOrder = query.order || "DESC";
    offset = limit * (page - 1);
    let findQuery: any = {
        limit: +limit,
        offset: offset,
        order: [[sort, sortOrder]],
    };
    if (query.is_active) {
        findQuery["where"] = { is_active: true };
    }
    return {
        docs: await SurveyModel.findAll(findQuery),
        page: +page,
        limit: +limit,
        pages,
        total: data.count,
    };
}

export async function getGlobalSurvey() {
    return await SurveyModel.findOne({ where: { code: "ALL" } });
}

export async function createSurvey(payload: any) {
    const orCondtion: any = [
        { name: payload.name },
        { organization_id: payload.organization_id },
        { survey_id: payload.survey_id },
    ];
    const existingSurvey: any = await SurveyModel.findOne({
        where: { [Op.or]: orCondtion },
    });
    if (existingSurvey) {
        if (existingSurvey.survey_id == payload.survey_id) {
            throw new APIError(
                "survey",
                `Survey Already Exists with  ${payload.survey_id}`
            );
        }
        if (existingSurvey.organization_id == payload.organization_id) {
            throw new APIError(
                "survey",
                `Survey Already Exists with given organization`
            );
        }
        if (existingSurvey.name == payload.name) {
            throw new APIError(
                "survey",
                `Survey Already Exists with ${payload.name}`
            );
        }
    }
    return await SurveyModel.create(payload);
}

export async function activateSurvey(id: any) {
    await SurveyModel.update(
        { is_active: true },
        { where: { id: parseInt(id) } }
    );
    return await readSurvey(id);
}

export async function deActivateSurvey(id: any) {
    await SurveyModel.update(
        { is_active: false },
        { where: { id: parseInt(id) } }
    );
    return await readSurvey(id);
}

export async function updateSurvey(id: any, payload: any) {
    await SurveyModel.update(payload, { where: { id: parseInt(id) } });
    return await readSurvey(id);
}