class Death < ActiveRecord::Base
	validates :cause, uniqueness: true, presence: true

  has_many :figures, dependent: :destroy
  has_many :demographics, through: :figures
end
