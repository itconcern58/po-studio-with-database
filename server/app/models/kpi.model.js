module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        company: String,
        asset: String,
        field: String,
        reservoir:String,
        well:String,
        month:String,
        plan_oil:Number,
        actual_oil: Number,
        plan_cumoil: Number,
        actual_cumoil: Number,
        plan_capex: Number,
        actual_capex: Number,
        plan_opex: Number,
        actual_opex: Number,
        plan_cashflow: Number,
        actual_cashflow: Number,
        plan_st_oil: Number,
        actual_st_oil: Number,
        plan_st_cumoil: Number,
        actual_st_cumoil: Number,
        plan_st_capex: Number,
        actual_st_capex: Number,
        plan_st_opex: Number,
        actual_st_opex: Number,
        plan_st_cashflow: Number,
        actual_st_casflow: Number,
        plan_ngl: Number,
        actual_ngl: Number,
        plan_cumngl: Number,
        actual_cumngl: Number,
        plan_ngl_capex: Number,
        actual_ngl_capex: Number,
        plan_ngl_opex: Number,
        actual_ngl_opex: Number,
        plan_ngl_cashflow: Number,
        actual_ngl_casflow: Number,
        plan_gas: Number,
        actual_gas: Number,
        plan_cumgas: Number,
        actual_cumgas: Number,
        plan_gas_capex: Number,
        actual_gas_capex: Number,
        plan_gas_opex: Number,
        actual_gas_opex: Number,
        plan_gas_cashflow: Number,
        actual_gas_casflow: Number,
        timeon: Number,
        Days: Number,
        ln_timeon_LT: Number,
        ln_oil: Number,
        Slope_LT: Number,
        Intercept_LT: Number,
        ln_st_oil: Number,
        Slope_ST: Number,
        Intercept_ST:Number ,
        ln_ngl: Number,
        Slope_NGL: Number ,
        Intercept_NGL: Number,
        LN_Gas: Number,
        SLOPE_GAS: Number,
        INTERCEPT_GAS: Number,
        rec_prod: Number,
        rec_timeon: Number,
        ln_rec_prod: Number,
        ln_rec_timeon: Number,
        published: Boolean
      },  
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const kpicollection = mongoose.model("kpi", schema);
    return kpicollection;
  };