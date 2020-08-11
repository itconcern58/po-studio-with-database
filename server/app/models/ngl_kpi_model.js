module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        company: String,
        asset: String,
        field: String,
        reservoir:String,
        well:String,
        month:String,
        plan_ngl:Number,
        actual_ngl: Number,
        plan_cumngl: Number,
        actual_cumngl: Number,
        plan_capex: Number,
        actual_capex: Number,
        plan_opex: Number,
        actual_opex: Number,
        plan_cashflow: Number,
        actual_cashflow: Number,
        
        plan_st_ngl:Number,
        actual_st_ngl: Number,
        plan_st_cumngl: Number,
        actual_st_cumngl: Number,
        plan_st_capex: Number,
        actual_st_capex: Number,
        plan_st_opex: Number,
        actual_st_opex: Number,
        plan_st_cashflow: Number,
        actual_st_cashflow: Number,
      },  
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const ngl_kpicollection = mongoose.model("ngl_kpi", schema);
    return ngl_kpicollection;
  };