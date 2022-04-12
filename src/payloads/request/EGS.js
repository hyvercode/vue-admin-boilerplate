export default class RequestEgs {

    constructor(id,
                egs_id,
                kpi_id,
                measurement,
                target,
                target_type_id,
                weight,
                self_achievement,
                self_kpi_point,
                self_evaluation,
                self_notes,
                head_id,
                head_target,
                head_weight,
                head_achievement,
                head_kpi_point,
                head_evaluation,
                head_notes,
                reviewer_id,
                reviewer_target,
                reviewer_weight,
                reviewer_achievement,
                reviewer_kpi_point,
                reviewer_evaluation,
                reviewer_notes,
                kpi_result) {
        this.id = id;
        this.egs_id = egs_id;
        this.kpi_id = kpi_id;
        this.measurement = measurement;
        this.target = target;
        this.target_type_id = target_type_id;
        this.weight = weight;
        this.self_achievement = self_notes;
        this.self_kpi_point = self_kpi_point;
        this.self_evaluation = self_evaluation;
        this.self_notes = self_notes;
        this.head_id = head_id;
        this.head_target = head_target;
        this.head_weight = head_weight;
        this.head_achievement = head_achievement;
        this.head_kpi_point = head_kpi_point;
        this.head_evaluation = head_evaluation;
        this.head_notes = head_notes;
        this.reviewer_id = reviewer_id;
        this.reviewer_target = reviewer_target;
        this.reviewer_weight = reviewer_weight;
        this.reviewer_achievement = reviewer_achievement;
        this.reviewer_kpi_point = reviewer_kpi_point;
        this.reviewer_evaluation = reviewer_evaluation;
        this.reviewer_notes = reviewer_notes;
        this.kpi_result = kpi_result;
    }

}