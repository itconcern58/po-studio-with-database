module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        timeon: Number,
        prod: Number,
        log_prod: Number,
        rec_prod:Number, 
        gradientexp: Number,
        yInterceptexp: Number,
        gradienthyp: Number,
        yIntercepthyp: Number    
      },  
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const frdcollection = mongoose.model("frd", schema);
    return frdcollection;
  };