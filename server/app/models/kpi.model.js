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