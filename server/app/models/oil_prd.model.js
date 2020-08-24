module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        timeon: Number,
        prod: Number,
        log_prod: Number,
        rec_prod: Number,
        short_prod: Number,
        reserves_Exp: Number,
        reserves_Hyp: Number,
        reserves_Har: Number,
        yInterceptexp: Number,
        gradientexp: Number,
        yIntercepthyp: Number,
        gradienthyp: Number,
        yIntercepthar: Number,
        gradienthar: Number,
        b: Number
      },
      { timestamps: true },
      );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const prdcollection = mongoose.model("prd", schema);
    return prdcollection;
  };