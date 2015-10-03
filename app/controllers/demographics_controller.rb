class DemographicsController < ApplicationController
 
  def index
  	@search=Demographic.search(params[:q])
  	@results = @search.result
  	@search.state_cont = 'Open' && @search.race_cont = 'Open' && @search.sex_cont = 'Open' unless params[:q] 
  	@demographics = @search.result
  
  	@figuresYears = [];
  	@deaths = []
  	# add figure rows to be accessible with gon
  	unless params[:q] == nil 
	  	@search.result.each do |dem|
				@figures = Figure.find_by_sql "SELECT * FROM figures WHERE demographic_id = " + dem.id.to_s
				@figuresYears.push(@figures)
			end
		end
	
		# add death rows to be accessible with gon
		unless @figuresYears[0] == nil;
		 	@figuresYears[0].each do |figure|
		 		@death = Death.find_by_sql "SELECT * FROM deaths WHERE id = " + figure.death_id.to_s
				@deaths.push(@death[0])
			end
		end
		#
		
		@data = {
			demographics: @demographics,
			deaths: @deaths,
			figuresYears: @figuresYears
		};

		gon.demographics = @demographics
		gon.deaths = @deaths
		gon.figYears = @figuresYears
		
		# As API
		respond_to do |format|
			format.html
			format.json {
				render json: @data
			}
		end
	end

end