const Foods=require("../models/foodmodel")

//filter,sorting and pagination//

class APIfeature {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filtering() {
      const queryObj = { ...this.queryString }; //queryString=request.query//
  
      const excludedFields = ["page", "sort", "limit"];
  
      excludedFields.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
  
      queryStr = queryStr.replace(
        /\b(gte|gt|lt|lte|regex)\b/g,
        (match) => "$" + match
      );
  
      this.query.find(JSON.parse(queryStr));
  
      return this;
    }
    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        console.log(sortBy);
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }
      return this;
    }
    paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 9;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  const foodCtrl={
      getfoods:async(request,response)=>{
        try {
          const features = new APIfeature(Foods.find(), request.query)
          .filtering()
          .sorting()
          .paginating();
  
        const foods = await features.query;
  
        response.json({
          status: "success",
          result: foods.length,
          foods: foods,
        });
          
        } catch (error) {
          return response.status(500).json({msg:error.message})
          
        }
      },
      createfood:async(request,response)=>{
        try {
          const {
            food_id,
            title,
            price,
            description,
            images,
            category
          }=request.body;

          if (!images)
          return response.status(400).json({ msg: "No images upload" });
        const food = await Foods.findOne({ food_id });
        if (food)
          return response
            .status(400)
            .json({ msg: "This Food already Exists" });

            const newFood = new Foods({
              food_id,
              price,
              description,
              title: title.toLowerCase(),
              category,
              images,
            });
            await newFood.save();
            response.json({ msg: "Created Food Successfully" });
          
        } catch (error) {
          return response.status(500).jsoon({msg:error.message})
          
        }
      },
      deletefood:async(request,response)=>{
        try {
          await Foods.findByIdAndDelete(request.params.id);
      response.json({ msg: "Deleted A Food" });
        } catch (error) {

          return response.status(500).json({msg:error.message})
          
        }
      },
      updatefood:async(request,response)=>{
        try {
          const { title, price, description, images, category } =
          request.body;
        if (!images) return response.status(400).json({ msg: "No image found" });
        await Foods.findOneAndUpdate(
          { _id: request.params.id },
          {
            title: title.toLowerCase(),
            price,
            description,
            images,
            category,
          }
        );
  
        response.json({ msg: "Updated Food successfully" });

          
        } catch (error) {
          return response.status(500).json({msg:error.message})
          
        }
      }
  }

  module.exports=foodCtrl;