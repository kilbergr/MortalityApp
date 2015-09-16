class Figure < ActiveRecord::Base
  validates :number, presence: true, uniqueness: false
  validates :percent, presence: true, uniqueness: false

  belongs_to :death
  belongs_to :demographic
end
