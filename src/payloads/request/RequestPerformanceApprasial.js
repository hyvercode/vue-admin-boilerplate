export default class RequestPerformanceApprasial {
    constructor(id,
                head_achievement,
                head_evaluation,
                head_notes,
                head_kpi_point,
                reviewer_achievement,
                reviewer_evaluation,
                reviewer_notes,
                reviewer_kpi_point,) {
        this.id = id;
        this.head_achievement = head_achievement;
        this.head_evaluation = head_evaluation;
        this.head_notes = head_notes;
        this.head_kpi_point = head_kpi_point;
        this.reviewer_achievement = reviewer_achievement;
        this.reviewer_evaluation = reviewer_evaluation;
        this.reviewer_notes = reviewer_notes;
        this.reviewer_kpi_point = reviewer_kpi_point;
    }

}