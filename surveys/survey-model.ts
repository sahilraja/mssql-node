import { STRING, TINYINT, Model } from "sequelize";
import { sequelize } from "../database";
const schema = {
    name: {
        type: STRING,
        allowNull: true,
    },
    survey_id: {
        type: STRING,
        allowNull: true,
    },
    survey_url: {
        type: STRING,
        allowNull: true,
    },
    organization_id: {
        type: STRING,
        allowNull: true,
    },
    is_active: {
        type: TINYINT,
        allowNull: false,
        defaultValue: true,
    },
};

export class SurveyModel extends Model { }

SurveyModel.init(schema, {
    sequelize,
    modelName: "surveys",
    timestamps: true,
});
