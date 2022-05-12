from random import choice
from turtle import st
from experta import *


class Therepies(Fact):
    """Info about the Therepies."""
    pass


class ActivityPlan(KnowledgeEngine):
    suggestions = []

    # CATEGORIZATION
    @Rule(Therepies(age=MATCH.age, gender=MATCH.gender, level=MATCH.level))
    def age_cat(self, age, gender, level):
        if age == '20-30' and gender == 'male' and level == 'Acute (Level 1)':
            self.declare(Therepies(therepi_group=choice(["DG01"])))
        elif age == '20-30' and gender == 'female' and level == 'Acute (Level 1)':
            self.declare(Therepies(therepi_group=choice(["DG02"])))
        elif age == '30-40' and gender == 'male' and level == 'Acute (Level 1)':
            self.declare(Therepies(therepi_group=choice(["DG03"])))
        elif age == '30-40' and gender == 'female' and level == 'Acute (Level 1)':
            self.declare(Therepies(therepi_group=choice(["DG04"])))
        elif age == '40 and above' and gender == 'male' and level == 'Acute (Level 1)':
            self.declare(Therepies(therepi_group=choice(["DG05"])))
        elif age == '40 and above' and gender == 'female' and level == 'Acute (Level 1)':
            self.declare(Therepies(therepi_group=choice(["DG06"])))
        elif age == '20-30' and gender == 'male' and level == 'Transient (Level 2)':
            self.declare(Therepies(therepi_group=choice(["DG07"])))
        elif age == '20-30' and gender == 'female' and level == 'Transient (Level 2)':
            self.declare(Therepies(therepi_group=choice(["DG08"])))
        elif age == '30-40' and gender == 'male' and level == 'Transient (Level 2)':
            self.declare(Therepies(therepi_group=choice(["DG09"])))
        elif age == '30-40' and gender == 'female' and level == 'Transient (Level 2)':
            self.declare(Therepies(therepi_group=choice(["DG10"])))
        elif age == '40 and above' and gender == 'male' and level == 'Transient (Level 2)':
            self.declare(Therepies(therepi_group=choice(["DG11"])))
        elif age == '40 and above' and gender == 'female' and level == 'Transient (Level 2)':
            self.declare(Therepies(therepi_group=choice(["DG12"])))
        elif age == '20-30' and gender == 'male' and level == 'Chronic (Level 3)':
            self.declare(Therepies(therepi_group=choice(["DG13"])))
        elif age == '20-30' and gender == 'female' and level == 'Chronic (Level 3)':
            self.declare(Therepies(therepi_group=choice(["DG14"])))
        elif age == '30-40' and gender == 'male' and level == 'Chronic (Level 3)':
            self.declare(Therepies(therepi_group=choice(["DG15"])))
        elif age == '30-40' and gender == 'female' and level == 'Chronic (Level 3)':
            self.declare(Therepies(therepi_group=choice(["DG16"])))
        elif age == '40 and above' and gender == 'male' and level == 'Chronic (Level 3)':
            self.declare(Therepies(therepi_group=choice(["DG17"])))
        elif age == '40 and above' and gender == 'female' and level == 'Chronic (Level 3)':
            self.declare(Therepies(therepi_group=choice(["DG18"])))
      

    # RULESET 01
    @Rule(Therepies(therepi_group="DG01"))
    def plan1(self):
        self.suggestions = "rule_1"
        

    # RULESET 02
    @Rule(Therepies(therepi_group="DG02"))
    def plan2(self):
        self.suggestions = "rule_2"

    # RULESET 03
    @Rule(Therepies(therepi_group="DG03"))
    def plan3(self):
        self.suggestions = "rule_3"

    # RULESET 04
    @Rule(Therepies(therepi_group="DG04"))
    def plan4(self):
        self.suggestions ="rule_4"
    # RULESET 05
    @Rule(Therepies(therepi_group="DG05"))
    def plan5(self):
        self.suggestions = "rule_5"

    # RULESET 06
    @Rule(Therepies(therepi_group="DG06"))
    def plan6(self):
        self.suggestions = "rule_6"

    # RULESET 07
    @Rule(Therepies(therepi_group="DG07"))
    def plan7(self):
        self.suggestions = "rule_7"
    # RULESET 08
    @Rule(Therepies(therepi_group="DG08"))
    def plan8(self):
        self.suggestions = "rule_8"
    # RULESET 09
    @Rule(Therepies(therepi_group="DG09"))
    def plan9(self):
        self.suggestions = "rule_9"
    # RULESET 10
    @Rule(Therepies(therepi_group="DG10"))
    def plan10(self):
        self.suggestions = "rule_10"

    # RULESET 11
    @Rule(Therepies(therepi_group="DG11"))
    def plan11(self):
        self.suggestions = "rule_11"
    # RULESET 12
    @Rule(Therepies(therepi_group="DG12"))
    def plan12(self):
        self.suggestions = "rule_12"

    # RULESET 13
    @Rule(Therepies(therepi_group="DG13"))
    def plan13(self):
        self.suggestions = "rule_13"
    # RULESET 14
    @Rule(Therepies(therepi_group="DG14"))
    def plan14(self):
        self.suggestions = "rule_14"

    # RULESET 15
    @Rule(Therepies(therepi_group="DG15"))
    def plan15(self):
        self.suggestions = "rule_15"
    # RULESET 16
    @Rule(Therepies(therepi_group="DG16"))
    def plan16(self):
        self.suggestions = "rule_16"
    # RULESET 17
    @Rule(Therepies(therepi_group="DG17"))
    def plan17(self):
        self.suggestions = "rule_17"
    # RULESET 18
    @Rule(Therepies(therepi_group="DG18"))
    def plan18(self):
        self.suggestions = "rule_18"

  